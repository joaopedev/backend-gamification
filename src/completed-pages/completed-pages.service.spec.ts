import { Test, TestingModule } from '@nestjs/testing';
import { CompletedPagesService } from './completed-pages.service';

describe('CompletedPagesService', () => {
  let service: CompletedPagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompletedPagesService],
    }).compile();

    service = module.get<CompletedPagesService>(CompletedPagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
