import { Test, TestingModule } from '@nestjs/testing';
import { CoinTransactionController } from './coin-transaction.controller';
import { CoinTransactionService } from './coin-transaction.service';

describe('CoinTransactionController', () => {
  let controller: CoinTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoinTransactionController],
      providers: [CoinTransactionService],
    }).compile();

    controller = module.get<CoinTransactionController>(CoinTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
