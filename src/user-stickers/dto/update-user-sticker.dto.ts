import { PartialType } from '@nestjs/mapped-types';
import { CreateUserStickerDTO } from './create-user-sticker.dto';

export class UpdateUserStickerDto extends PartialType(CreateUserStickerDTO) {}
