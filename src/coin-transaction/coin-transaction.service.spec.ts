import { Test, TestingModule } from '@nestjs/testing';
import { CoinTransactionService } from './coin-transaction.service';

describe('CoinTransactionService', () => {
  let service: CoinTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoinTransactionService],
    }).compile();

    service = module.get<CoinTransactionService>(CoinTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
