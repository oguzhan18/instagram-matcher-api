import { Controller, Get, Query, HttpException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InstagramMatcherService } from './instagram-matcher.service';

@ApiTags('Instagram Matcher')
@Controller('instagram-matcher')
export class InstagramMatcherController {
  constructor(private readonly instagramMatcherService: InstagramMatcherService) {}

  @Get('match')
  @ApiOperation({ summary: 'Match Instagram account' })
  @ApiResponse({ status: 200, description: 'The matched Instagram account' })
  @ApiResponse({ status: 404, description: 'No match found' })
  async match(@Query('username') username: string) {
    try {
      const result = await this.instagramMatcherService.matchAccount(username);
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
