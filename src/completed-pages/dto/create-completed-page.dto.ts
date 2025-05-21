import { IsInt } from 'class-validator';

export class CompletePageDto {
  @IsInt()
  pageIndex: number;

  @IsInt()
  userId: number;
}