import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll() {
    return this.albumService.findAll();
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: number) {
    return this.albumService.findByUser(userId);
  }
}
