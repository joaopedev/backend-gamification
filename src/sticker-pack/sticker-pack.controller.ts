import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { StickerPackService } from './sticker-pack.service';

@Controller('sticker-packs')
export class StickerPackController {
  constructor(private readonly service: StickerPackService) {}

  @Post('activity')
  createFromActivity(
    @Body('userId', ParseIntPipe) userId: number,
    @Body('title') title: string,
  ) {
    return this.service.createFromActivity(userId, title);
  }

  @Post('qrcode')
  createFromQRCode(
    @Body('userId', ParseIntPipe) userId: number,
    @Body('title') title: string,
    @Body('stickerIds') stickerIds: number[],
  ) {
    return this.service.createFromQRCode(userId, title, stickerIds);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
