import { Injectable } from '@nestjs/common';
import { CreateUserStickerDTO } from './dto/create-user-sticker.dto';
import { UpdateUserStickerDto } from './dto/update-user-sticker.dto';

@Injectable()
export class UserStickersService {
  create(createUserStickerDto: CreateUserStickerDTO) {
    return 'This action adds a new userSticker';
  }

  findAll() {
    return `This action returns all userStickers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userSticker`;
  }

  update(id: number, updateUserStickerDto: UpdateUserStickerDto) {
    return `This action updates a #${id} userSticker`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSticker`;
  }
}
