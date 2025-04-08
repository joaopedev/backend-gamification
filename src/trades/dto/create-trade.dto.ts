import { IsInt, IsEnum } from 'class-validator';

export class CreateTradeDTO {
  @IsInt()
  requesterId: number;

  @IsInt()
  receiverId: number;

  @IsInt()
  offeredStickerId: number;

  @IsInt()
  requestedStickerId: number;

  @IsEnum(['PENDING', 'ACCEPTED', 'REJECTED'])
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}