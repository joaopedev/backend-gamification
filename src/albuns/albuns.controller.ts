import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { UpdateAlbunDto } from './dto/update-albun.dto';
import { AlbumService } from './albuns.service';
import { CreateAlbumDto } from './dto/create-albun.dto';

@Controller('albuns')
export class AlbunsController {
  constructor(private readonly albunsService: AlbumService) {}

  @Post()
  create(@Body() createAlbunDto: CreateAlbumDto) {
    return this.albunsService.create(createAlbunDto);
  }

  @Get()
  findAll() {
    return this.albunsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albunsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbunDto: UpdateAlbunDto) {
    return this.albunsService.update(+id, updateAlbunDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albunsService.remove(+id);
  }
}
