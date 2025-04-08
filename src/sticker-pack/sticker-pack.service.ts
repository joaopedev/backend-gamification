import { Injectable } from '@nestjs/common';
import { CreateStickerPackDTO } from './dto/create-sticker-pack.dto';
import { UpdateStickerPackDto } from './dto/update-sticker-pack.dto';

@Injectable()
export class StickerPackService {
  create(createStickerPackDto: CreateStickerPackDTO) {
    return 'This action adds a new stickerPack';
  }

  findAll() {
    return `This action returns all stickerPack`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stickerPack`;
  }

  update(id: number, updateStickerPackDto: UpdateStickerPackDto) {
    return `This action updates a #${id} stickerPack`;
  }

  remove(id: number) {
    return `This action removes a #${id} stickerPack`;
  }
}
