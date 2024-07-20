import { Module } from '@nestjs/common';
import { InstagramMatcherModule } from './instagram-matcher/instagram-matcher.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [InstagramMatcherModule, HttpModule]
})
export class AppModule {}
