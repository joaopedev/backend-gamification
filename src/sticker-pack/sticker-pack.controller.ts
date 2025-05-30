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

  @Post('coins')
  createFromCoins(
    @Body('userId', ParseIntPipe) userId: number,
    @Body('title') title: string,
    @Body('quantity', ParseIntPipe) quantity: number, // novo parâmetro
  ) {
    return this.service.createFromCoins(userId, title, quantity);
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
