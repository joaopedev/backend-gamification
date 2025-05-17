import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userStickersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserStickerDto: UpdateUserStickerDto,
  ) {
    return this.userStickersService.update(id, updateUserStickerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userStickersService.remove(id);
  }
}
