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
      throw new BadRequestException('Quantidade inválida. Deve ser 1, 3 ou 5.');
    }

    const PACK_COST = priceTable[quantity];

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    if (user.coins < PACK_COST) {
      throw new BadRequestException(
        'Não há moedas suficientes para comprar pacotes de figurinhas',
      );
    }

    const allStickers = await this.stickerRepo.find();

    if (allStickers.length === 0) {
      throw new BadRequestException(
        'Não há figurinhas disponíveis para montar os pacotes.',
      );
    }

    const userExistingStickers = await this.userStickerRepo.find({
      where: { user: { id: userId } },
      relations: ['sticker'],
    });
    const userOwnedStickerIds = new Set(
      userExistingStickers.map((us) => us.sticker.id),
    );

    const newStickersForUser = allStickers.filter(
      (sticker) => !userOwnedStickerIds.has(sticker.id),
    );

    if (newStickersForUser.length < quantity * STICKER_COUNT) {
      throw new BadRequestException(
        'Não há figurinhas novas suficientes para montar os pacotes. Por favor, tente novamente mais tarde ou compre menos pacotes.',
      );
    }

    const allSelectedStickers: Sticker[] = [];
    const usedStickerIdsForThisPurchase = new Set<number>();
    let attempts = 0;

    while (
      allSelectedStickers.length < quantity * STICKER_COUNT &&
      attempts < MAX_ATTEMPTS * quantity
    ) {
      const randomIndex = Math.floor(Math.random() * newStickersForUser.length);
      const sticker = newStickersForUser[randomIndex];

      if (!sticker || usedStickerIdsForThisPurchase.has(sticker.id)) {
        attempts++;
        continue;
      }

      usedStickerIdsForThisPurchase.add(sticker.id);
      allSelectedStickers.push(sticker);
      attempts++;
    }

    if (allSelectedStickers.length < quantity * STICKER_COUNT) {
      throw new BadRequestException(
        'Não foi possível encontrar figurinhas novas qualificadas suficientes para os pacotes. Tente novamente.',
      );
    }

    const userStickers: UserSticker[] = [];
    const packs: StickerPack[] = [];

    for (let i = 0; i < quantity; i++) {
      const packStickers = allSelectedStickers.slice(
        i * STICKER_COUNT,
        (i + 1) * STICKER_COUNT,
      );

      const newUserStickers = packStickers.map((sticker) =>
        this.userStickerRepo.create({
          user,
          sticker,
          quantity: 1,
          pasted: false,
        }),
      );

      userStickers.push(...newUserStickers);

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
    if (!pack) throw new Error('Pacote de figurinhas não encontrado');
    return this.stickerPackRepo.remove(pack);
  }
}
