import { PartialType } from '@nestjs/mapped-types';
import { CreateStickerPackDTO } from './create-sticker-pack.dto';

export class UpdateStickerPackDto extends PartialType(CreateStickerPackDTO) {}
