import { IsInt, Min } from 'class-validator';

export class CreateUserStickerDTO {
  @IsInt()
  userId: number;

  @IsInt()
  stickerId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}