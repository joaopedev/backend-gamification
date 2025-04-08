import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserStickersService } from './user-stickers.service';
import { CreateUserStickerDTO } from './dto/create-user-sticker.dto';
import { UpdateUserStickerDto } from './dto/update-user-sticker.dto';

@Controller('user-stickers')
export class UserStickersController {
  constructor(private readonly userStickersService: UserStickersService) {}

  @Post()
  create(@Body() createUserStickerDto: CreateUserStickerDTO) {
    return this.userStickersService.create(createUserStickerDto);
  }

  @Get()
  findAll() {
    return this.userStickersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userStickersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserStickerDto: UpdateUserStickerDto) {
    return this.userStickersService.update(+id, updateUserStickerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userStickersService.remove(+id);
  }
}
