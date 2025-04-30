import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sticker } from './entities/sticker.entity';
import { CreateStickerDTO } from './dto/create-sticker.dto';
import { UpdateStickerDto } from './dto/update-sticker.dto';

@Injectable()
export class StickersService {
  constructor(
    @InjectRepository(Sticker)
    private readonly stickerRepo: Repository<Sticker>,

  ) {}

  async create(createStickerDto: CreateStickerDTO, file: Express.Multer.File) {
    const { name, sponsor } = createStickerDto;

    const newSticker = this.stickerRepo.create({
      name,
      sponsor,
      image_url: file.filename
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
