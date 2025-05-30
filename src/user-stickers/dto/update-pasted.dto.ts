import { IsBoolean, IsNumber } from 'class-validator';

export class UpdatePastedDto {
  @IsBoolean()
  pasted: boolean;

  @IsNumber()
  userId: number;
}