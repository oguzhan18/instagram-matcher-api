import { Test, TestingModule } from '@nestjs/testing';
import { InstagramMatcherController } from './instagram-matcher.controller';

describe('InstagramMatcherController', () => {
  let controller: InstagramMatcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstagramMatcherController],
    }).compile();

    controller = module.get<InstagramMatcherController>(InstagramMatcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
