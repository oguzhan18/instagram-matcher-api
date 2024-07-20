import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { catchError, map } from 'rxjs/operators';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class InstagramMatcherService {
  private readonly apiUrl = 'https://instagram-scraper-2022.p.rapidapi.com/ig/info_username/?user';
  private readonly apiHost = 'instagram-scraper-2022.p.rapidapi.com';
  private readonly apiKey = process.env.RAPIDAPI_KEY;
  private readonly genderApiUrl = 'https://api.genderize.io';
  private readonly logger = new Logger(InstagramMatcherService.name);

  constructor(private readonly httpService: HttpService) {}

  async getAccountInfo(username: string, retries: number = 3): Promise<any> {
    const headers = {
      'x-rapidapi-host': this.apiHost,
      'x-rapidapi-key': this.apiKey,
    };

    try {
      const response = await this.httpService
        .get(`${this.apiUrl}=${username}`, { headers })
        .pipe(
          map((response: AxiosResponse) => this.extractRelevantData(response.data)),
          catchError((error) => {
            if (error.response && error.response.status === 429 && retries > 0) {
              this.logger.warn('Rate limit exceeded. Retrying after delay...');
              return this.delay(2000).then(() => this.getAccountInfo(username, retries - 1));
            }
            throw new HttpException('Error fetching Instagram account data', error.response?.status || 500);
          })
        )
        .toPromise();
      return response;
    } catch (error) {
      throw new HttpException('Error fetching Instagram account data', error.response?.status || 500);
    }
  }

  async getGender(fullName: string): Promise<string> {
    const [firstName] = fullName.split(' ');
    const url = `${this.genderApiUrl}?name=${firstName}`;
    const response = await this.httpService.get(url).toPromise();
    return response.data.gender || 'unknown';
  }

  async extractRelevantData(data: any): Promise<any> {
    const user = data.user;
    const userGender = await this.getGender(user.full_name);

    const suggestedAccounts = await Promise.all(
      user.chaining_suggestions.map(async suggestion => {
        const suggestionGender = await this.getGender(suggestion.full_name);
        return {
          suggestion,
          suggestionGender
        };
      })
    );

    const filteredSuggestions = suggestedAccounts
      .filter(({ suggestionGender }) => userGender === 'male' ? suggestionGender === 'female' : suggestionGender === 'male')
      .map(({ suggestion }) => ({
        username: suggestion.username,
        full_name: suggestion.full_name,
        profile_pic_url: suggestion.profile_pic_url,
        is_verified: suggestion.is_verified
      }));

    return {
      username: user.username,
      full_name: user.full_name,
      biography: user.biography,
      profile_pic_url: user.profile_pic_url,
      followers_count: user.follower_count,
      following_count: user.following_count,
      is_verified: user.is_verified,
      suggested_accounts: filteredSuggestions
    };
  }

  async matchAccount(username: string): Promise<any> {
    const accountInfo = await this.getAccountInfo(username);
    return accountInfo;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
