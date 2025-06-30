import { IsInt, Min, Max } from 'class-validator';

export class UpdateUserLevelDto {
  @IsInt()
  @Min(1)
  @Max(164)
  level: number;
}