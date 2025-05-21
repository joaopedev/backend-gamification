import { Test, TestingModule } from '@nestjs/testing';
import { CompletedPagesController } from './completed-pages.controller';
import { CompletedPagesService } from './completed-pages.service';

describe('CompletedPagesController', () => {
  let controller: CompletedPagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompletedPagesController],
      providers: [CompletedPagesService],
    }).compile();

    controller = module.get<CompletedPagesController>(CompletedPagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
