import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { StickersService } from './stickers.service';
import { CreateStickerDTO } from './dto/create-sticker.dto';
import { UpdateStickerDto } from './dto/update-sticker.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('stickers')
export class StickersController {
  constructor(private readonly stickersService: StickersService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/stickers',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @Body() createStickerDto: CreateStickerDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.stickersService.create(createStickerDto, file);
  }

  @Get()
  findAll() {
    return this.stickersService.findAll();
  }

  @Post('import-existing')
  async importExistingStickers() {
    return this.stickersService.populateFromExistingImages();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stickersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateStickerDto: UpdateStickerDto) {
    return this.stickersService.update(+id, updateStickerDto);
  }

  @Delete('deleteUser/:id')
  remove(@Param('id') id: string) {
    return this.stickersService.remove(+id);
  }
}
