import { Test, TestingModule } from '@nestjs/testing';
import { InstagramMatcherService } from './instagram-matcher.service';

describe('InstagramMatcherService', () => {
  let service: InstagramMatcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstagramMatcherService],
    }).compile();

    service = module.get<InstagramMatcherService>(InstagramMatcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
