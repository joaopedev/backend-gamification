import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StickerPackService } from './sticker-pack.service';
import { CreateStickerPackDTO } from './dto/create-sticker-pack.dto';
import { UpdateStickerPackDto } from './dto/update-sticker-pack.dto';

@Controller('sticker-pack')
export class StickerPackController {
  constructor(private readonly stickerPackService: StickerPackService) {}

  @Post()
  create(@Body() createStickerPackDto: CreateStickerPackDTO) {
    return this.stickerPackService.create(createStickerPackDto);
  }

  @Get()
  findAll() {
    return this.stickerPackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stickerPackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStickerPackDto: UpdateStickerPackDto) {
    return this.stickerPackService.update(+id, updateStickerPackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stickerPackService.remove(+id);
  }
}
