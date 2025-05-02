import { IsString} from 'class-validator';

export class CreateStickerDTO {
  @IsString()
  name: string;

  @IsString()
  sponsor: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsString()
  area: string;

  @IsString()
  imageUrl: string;
}