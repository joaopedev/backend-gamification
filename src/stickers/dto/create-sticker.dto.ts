import { IsString, IsInt } from 'class-validator';

export class CreateStickerDTO {
  @IsString()
  name: string;

  @IsInt()
  packId: number;

  @IsString()
  imageUrl: string;

  @IsString()
  sponsor: string;
}