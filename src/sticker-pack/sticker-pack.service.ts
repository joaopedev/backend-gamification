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

  async createFromCoins(userId: number, title: string, quantity: number) {
    const STICKER_COUNT = 4;
    const MAX_ATTEMPTS = 100;

    const priceTable = {
      1: 50,
      3: 120,
      5: 180,
    };

    if (![1, 3, 5].includes(quantity)) {
      throw new BadRequestException('Invalid quantity. Must be 1, 3 or 5.');
    }

    const PACK_COST = priceTable[quantity];

    const user = await this.userRepo.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');

    if (user.coins < PACK_COST) {
      throw new BadRequestException(
        'Not enough coins to purchase sticker packs',
      );
    }

    const allSelectedStickers: Sticker[] = [];
    let attempts = 0;

    while (
      allSelectedStickers.length < quantity * STICKER_COUNT &&
      attempts < MAX_ATTEMPTS * quantity
    ) {
      const randomId = Math.floor(Math.random() * 260) + 1;

      const sticker = await this.stickerRepo.findOne({
        where: { id: randomId },
      });

      if (!sticker || sticker.sponsor === 'SPECIAL') {
        attempts++;
        continue;
      }

      allSelectedStickers.push(sticker);
      attempts++;
    }

    if (allSelectedStickers.length < quantity * STICKER_COUNT) {
      throw new BadRequestException('Could not find enough eligible stickers');
    }

    const userStickers: UserSticker[] = [];
    const packs: StickerPack[] = [];

    for (let i = 0; i < quantity; i++) {
      const packStickers = allSelectedStickers.slice(
        i * STICKER_COUNT,
        (i + 1) * STICKER_COUNT,
      );

      // Cria e salva os UserStickers
      const newUserStickers = packStickers.map((sticker) =>
        this.userStickerRepo.create({
          user,
          sticker,
          quantity: 1,
          sponsor: sticker.sponsor,
          pasted: false,
        }),
      );

      userStickers.push(...newUserStickers);

      // Cria o pacote
      const pack = this.stickerPackRepo.create({
        title: `${title} ${i + 1}`,
        user,
        stickers: packStickers,
      });

      packs.push(pack);
    }

    await this.userStickerRepo.save(userStickers);

    user.coins -= PACK_COST;
    await this.userRepo.save(user);

    return this.stickerPackRepo.save(packs);
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
