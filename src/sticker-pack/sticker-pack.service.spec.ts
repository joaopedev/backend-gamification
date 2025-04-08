import { Test, TestingModule } from '@nestjs/testing';
import { StickerPackService } from './sticker-pack.service';

describe('StickerPackService', () => {
  let service: StickerPackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StickerPackService],
    }).compile();

    service = module.get<StickerPackService>(StickerPackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
