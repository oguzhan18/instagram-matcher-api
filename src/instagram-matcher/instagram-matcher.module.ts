import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { InstagramMatcherService } from './instagram-matcher.service';
import { InstagramMatcherController } from './instagram-matcher.controller';
@Module({
  imports: [HttpModule],
  providers: [InstagramMatcherService],
  controllers: [InstagramMatcherController],
})
export class InstagramMatcherModule {}
