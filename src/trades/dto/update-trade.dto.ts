import { PartialType } from '@nestjs/mapped-types';
import { CreateTradeDTO } from './create-trade.dto';

export class UpdateTradeDto extends PartialType(CreateTradeDTO) {}
