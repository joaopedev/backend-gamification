import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sticker } from './entities/sticker.entity';
import { CreateStickerDTO } from './dto/create-sticker.dto';
import { UpdateStickerDto } from './dto/update-sticker.dto';
import { readdirSync } from 'fs';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class StickersService {
  constructor(
    @InjectRepository(Sticker)
    private readonly stickerRepo: Repository<Sticker>,
  ) {}

  async seedStickers() {
    const stickersDir = join(__dirname, '..', '..', 'uploads', 'stickers');
    const files = fs.readdirSync(stickersDir);
  
    for (const file of files) {
      const name = file.split('.')[0];
  
      const exists = await this.stickerRepo.findOne({ where: { name } });
      if (exists) continue;
  
      const newSticker = this.stickerRepo.create({
        name,
        sponsor: 'default sponsor',
        description: 'default description',
        category: 'default category',
        area: 'default area',
        sub_category: 'default sub-category',
        image_url: `http://localhost:3000/sticker-images/${file}`,
      });
  
      await this.stickerRepo.save(newSticker);
    }
  
    console.log('✅ Stickers populados automaticamente.');
  }

  async populateFromExistingImages() {
    const stickersDir = join(__dirname, '..', '..', 'uploads', 'stickers');
    const files = readdirSync(stickersDir);
  
    for (const file of files) {
      const existing = await this.stickerRepo.findOne({ where: { image_url: `http://localhost:3000/sticker-images/${file}` } });
      if (existing) continue;
  
      const name = file.split('.')[0]; // Ex: "A1.png" -> "A1"
  
      const newSticker = this.stickerRepo.create({
        name,
        sponsor: 'Padrão',
        description: 'Figurinha automática',
        category: 'Geral',
        area: 'Desconhecida',
        image_url: `http://localhost:3000/sticker-images/${file}`,
      });
  
      await this.stickerRepo.save(newSticker);
    }
  
    return { message: 'Importação concluída' };
  }

  async create(createStickerDto: CreateStickerDTO, file: Express.Multer.File) {
    const { name, sponsor, description, category, area } =
      createStickerDto;

    const filePath = join(__dirname, '..', '..', 'uploads', 'stickers', file.filename);
    if (!fs.existsSync(filePath)) {
      throw new BadRequestException('File not found');
    }
    const fileSize = fs.statSync(filePath).size / 1024 / 1024; // size in MB
    if (fileSize > 5) {
      fs.unlinkSync(filePath); // delete the file if it's too large
      throw new BadRequestException('File size exceeds 5MB limit');
    }
    const newSticker = this.stickerRepo.create({
      name,
      sponsor,
      description,
      category,
      area,
      image_url: `http://localhost:3000/sticker-images/${file.filename}`,
    });

    return this.stickerRepo.save(newSticker);
  }

  findAll() {
    return this.stickerRepo.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.stickerRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, updateStickerDto: UpdateStickerDto) {
    await this.stickerRepo.update(id, updateStickerDto);
    return this.stickerRepo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const sticker = await this.stickerRepo.findOne({ where: { id } });
    if (!sticker) throw new NotFoundException('Sticker not found');
    await this.stickerRepo.delete(id);
    return { message: 'Sticker deleted' };
  }
}
