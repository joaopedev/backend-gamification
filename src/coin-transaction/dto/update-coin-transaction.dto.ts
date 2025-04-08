import { PartialType } from '@nestjs/mapped-types';
import { CreateCoinTransactionDTO } from './create-coin-transaction.dto';

export class UpdateCoinTransactionDto extends PartialType(CreateCoinTransactionDTO) {}
