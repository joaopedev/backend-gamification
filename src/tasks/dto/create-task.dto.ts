import { IsString, IsInt, Min } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  description: string;

  @IsInt()
  @Min(1)
  reward: number;

  @IsInt()
  userId: number;
}