import { Test, TestingModule } from '@nestjs/testing';
import { StickerPackController } from './sticker-pack.controller';
import { StickerPackService } from './sticker-pack.service';

describe('StickerPackController', () => {
  let controller: StickerPackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StickerPackController],
      providers: [StickerPackService],
    }).compile();

    controller = module.get<StickerPackController>(StickerPackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
