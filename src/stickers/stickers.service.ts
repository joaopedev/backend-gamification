import { Injectable } from '@nestjs/common';
import { CreateStickerDto } from './dto/create-sticker.dto';
import { UpdateStickerDto } from './dto/update-sticker.dto';

@Injectable()
export class StickersService {
  create(createStickerDto: CreateStickerDto) {
    return 'This action adds a new sticker';
  }

  findAll() {
    return `This action returns all stickers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sticker`;
  }

  update(id: number, updateStickerDto: UpdateStickerDto) {
    return `This action updates a #${id} sticker`;
  }

  remove(id: number) {
    return `This action removes a #${id} sticker`;
  }
}
