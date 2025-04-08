import { PartialType } from '@nestjs/mapped-types';
import { CreateStickerDTO } from './create-sticker.dto';

export class UpdateStickerDto extends PartialType(CreateStickerDTO) {}
