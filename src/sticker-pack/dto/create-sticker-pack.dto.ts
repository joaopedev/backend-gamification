import { IsString, IsBoolean } from 'class-validator';

export class CreateStickerPackDTO {
  @IsString()
  name: string;

  @IsString()
  image_url: string;

  @IsString()
  sponsor: string; // Number of stickers in the collection

  @IsBoolean()
  pasted: boolean; // Indicates if the sticker pack is pasted or not
}