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
  section: string;

  @IsString()
  imageUrl: string;
}