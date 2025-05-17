import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { StickerPack } from './entities/sticker-pack.entity';
import { UserSticker } from 'src/user-stickers/entities/user-sticker.entity';
import { Users } from 'src/users/entities/user.entity';
import { Sticker } from 'src/stickers/entities/sticker.entity';

@Injectable()
export class StickerPackService {
  constructor(
    @InjectRepository(StickerPack)
    private readonly stickerPackRepo: Repository<StickerPack>,

    @InjectRepository(UserSticker)
    private readonly userStickerRepo: Repository<UserSticker>,

    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,

    @InjectRepository(Sticker)
    private readonly stickerRepo: Repository<Sticker>,
  ) {}

  async createFromCoins(userId: number, title: string) {
    const PACK_COST = 100;
    const STICKER_COUNT = 4;
    const MAX_ATTEMPTS = 100;

    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['userStickers', 'userStickers.sticker'],
    });

    if (!user) throw new NotFoundException('User not found');

    if (user.coins < PACK_COST) {
      throw new BadRequestException(
        'Not enough coins to purchase a sticker pack',
      );
    }

    // IDs de figurinhas que o usuário já possui
    const ownedStickerIds = new Set<number>(
      user.userStickers.map((us) => us.sticker.id),
    );

    const selectedStickers: Sticker[] = [];
    const selectedIds = new Set<number>();
    let attempts = 0;

    while (selectedStickers.length < STICKER_COUNT && attempts < MAX_ATTEMPTS) {
      const randomId = Math.floor(Math.random() * 260) + 1;
      if (selectedIds.has(randomId) || ownedStickerIds.has(randomId)) {
        attempts++;
        continue;
      }

      const sticker = await this.stickerRepo.findOne({
        where: { id: randomId },
      });
      if (!sticker || sticker.sponsor === 'SPECIAL') {
        attempts++;
        continue;
      }

      selectedStickers.push(sticker);
      selectedIds.add(randomId);
    }

    if (selectedStickers.length < STICKER_COUNT) {
      throw new BadRequestException('Could not find enough eligible stickers');
    }

    // Cria os UserStickers
    const userStickers = selectedStickers.map((sticker) =>
      this.userStickerRepo.create({
        user,
        sticker,
        quantity: 1,
        sponsor: sticker.sponsor,
        pasted: false,
      }),
    );

    await this.userStickerRepo.save(userStickers);

    // Deduz moedas
    user.coins -= PACK_COST;
    await this.userRepo.save(user);

    // Cria o pacote
    const pack = this.stickerPackRepo.create({
      title,
      user,
      stickers: selectedStickers,
    });

    return this.stickerPackRepo.save(pack);
  }

  findAll() {
    return this.stickerPackRepo.find({ relations: ['stickers'] });
  }

  findOne(id: number) {
    return this.stickerPackRepo.findOne({
      where: { id },
      relations: ['stickers'],
    });
  }

  async remove(id: number) {
    const pack = await this.stickerPackRepo.findOne({ where: { id } });
    if (!pack) throw new Error('Sticker pack not found');
    return this.stickerPackRepo.remove(pack);
  }
}
