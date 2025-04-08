import { Injectable } from '@nestjs/common';
import { CreateCoinTransactionDTO } from './dto/create-coin-transaction.dto';
import { UpdateCoinTransactionDto } from './dto/update-coin-transaction.dto';

@Injectable()
export class CoinTransactionService {
  create(createCoinTransactionDto: CreateCoinTransactionDTO) {
    return 'This action adds a new coinTransaction';
  }

  findAll() {
    return `This action returns all coinTransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coinTransaction`;
  }

  update(id: number, updateCoinTransactionDto: UpdateCoinTransactionDto) {
    return `This action updates a #${id} coinTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} coinTransaction`;
  }
}
