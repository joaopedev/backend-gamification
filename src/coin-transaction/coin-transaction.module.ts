import { Module } from '@nestjs/common';
import { CoinTransactionService } from './coin-transaction.service';
import { CoinTransactionController } from './coin-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { CoinTransaction } from './entities/coin-transaction.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Users, CoinTransaction])],
  controllers: [CoinTransactionController],
  providers: [CoinTransactionService],
})
export class CoinTransactionModule {}
