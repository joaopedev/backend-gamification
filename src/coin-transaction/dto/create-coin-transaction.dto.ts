import { IsEnum, IsInt, Min } from 'class-validator';

export class CreateCoinTransactionDTO {
  @IsEnum(['TASK', 'QR_CODE'])
  type: 'TASK' | 'QR_CODE';

  @IsInt()
  @Min(1)
  coins: number;

  @IsInt()
  userId: number;
}