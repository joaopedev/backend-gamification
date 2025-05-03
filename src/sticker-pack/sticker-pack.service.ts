import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { StickerPack } from './entities/sticker-pack.entity';
import { Sticker } from 'src/stickers/entities/sticker.entity';
import { UserSticker } from 'src/user-stickers/entities/user-sticker.entity';

@Injectable()
export class StickerPackService {
  constructor(
    @InjectRepository(StickerPack)
    private readonly stickerPackRepo: Repository<StickerPack>,

    @InjectRepository(Sticker)
    private readonly stickerRepo: Repository<UserSticker>,
  ) {}

  async createFromActivity(userId: number, title: string) {
    const stickers = await this.stickerRepo.find({
      where: {
        user: { id: userId },
        sponsor: Not('SPECIAL'),
      },
      take: 4,
    });

    if (stickers.length < 4) {
      throw new Error('Not enough stickers available for activity-based pack');
    }

    const pack = this.stickerPackRepo.create({
      title,
      user: { id: userId } as any,
      stickers,
    });

    return this.stickerPackRepo.save(pack);
  }

  async createFromQRCode(userId: number, title: string, stickerIds: number[]) {
    const stickers = await this.stickerRepo.findByIds(stickerIds);

    if (!stickers.length) {
      throw new Error('No stickers found for QR code');
    }

    const pack = this.stickerPackRepo.create({
      title,
      user: { id: userId } as any,
      stickers,
    });

    return this.stickerPackRepo.save(pack);
  }

  findAll() {
    return this.stickerPackRepo.find({ relations: ['stickers'] });
  }

  findOne(id: number) {
    return this.stickerPackRepo.findOne({ where: { id }, relations: ['stickers'] });
  }

  async remove(id: number) {
    const pack = await this.stickerPackRepo.findOne({ where: { id } });
    if (!pack) throw new Error('Sticker pack not found');
    return this.stickerPackRepo.remove(pack);
  }
}
