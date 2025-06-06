import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  Put,
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

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserStickerDto: UpdateUserStickerDto,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.userStickersService.update(id, updateUserStickerDto, userId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userStickersService.findByUser(userId);
  }

  @Put(':id/paste')
  async pasteStickerById(@Param('id', ParseIntPipe) id: number) {
    const result =
      await this.userStickersService.pasteStickerByUserStickerId(id);
    return {
      message: 'Figurinha colada com sucesso',
      userSticker: result,
    };
  }

  @Get('progress')
  getAlbumProgress(@Req() req) {
    const userId = req.user.id;
    return this.userStickersService.getAlbumProgress(userId);
  }

  @Post('sync-stickers-number')
  async syncStickersNumber() {
    return this.userStickersService.syncAllUsersStickerNumbers();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userStickersService.remove(id);
  }
}
