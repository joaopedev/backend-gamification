import { IsInt, IsEnum } from 'class-validator';
import { TradeStatus } from '../entities/tradeEnum';

export class CreateTradeDTO {
  @IsInt()
  requesterId: number;

  @IsInt()
  receiverId: number;

  @IsInt()
  offeredStickerId: number;

  @IsInt()
  requestedStickerId: number;

  @IsEnum(TradeStatus)
  status: TradeStatus;
}