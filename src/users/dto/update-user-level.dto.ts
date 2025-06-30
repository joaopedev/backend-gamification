import { IsInt, Min } from 'class-validator';

export class UpdateUserLevelDto {
  @IsInt()
  @Min(1)
  level: number;
}