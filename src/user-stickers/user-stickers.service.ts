import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSticker } from './entities/user-sticker.entity';
import { CreateUserStickerDTO } from './dto/create-user-sticker.dto';
import { UpdateUserStickerDto } from './dto/update-user-sticker.dto';
import { Users } from 'src/users/entities/user.entity';
import { Sticker } from 'src/stickers/entities/sticker.entity';

@Injectable()
export class UserStickersService {
  constructor(
    @InjectRepository(UserSticker)
    private readonly userStickerRepo: Repository<UserSticker>,

    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,

    @InjectRepository(Sticker)
    private readonly stickerRepo: Repository<Sticker>,
  ) {}

  async create(createUserStickerDto: CreateUserStickerDTO) {
    const { userId, stickerId = 0 } = createUserStickerDto;

    const user = await this.usersRepo.findOneOrFail({
      where: { id: Number(userId) },
    });

    const sticker = await this.stickerRepo.findOneOrFail({
      where: { id: Number(stickerId) },
    });

    const newUserSticker = this.userStickerRepo.create({
      user,
      sticker,
      quantity: 1,
      pasted: false,
    });

    return await this.userStickerRepo.save(newUserSticker);
  }

  async findAll() {
    return this.userStickerRepo.find({ relations: ['user', 'sticker'] });
  }

  async findOne(id: number) {
    const sticker = await this.userStickerRepo.findOne({
      where: { id },
      relations: ['user', 'sticker'],
    });

    if (!sticker) {
      throw new NotFoundException(`UserSticker with id ${id} not found`);
    }

    return sticker;
  }

  async findByUser(userId: number) {
    const userStickers = await this.userStickerRepo.find({
      where: {
        user: { id: userId },
      },
      relations: ['user', 'sticker'],
      order: {
        sticker: { id: 'ASC' },
      },
    });

    return userStickers;
  }

  async update(
    id: number,
    updateUserStickerDto: UpdateUserStickerDto,
    userId: number,
  ) {
    const sticker = await this.findOne(id);
    if (sticker.user.id !== userId) {
      throw new BadRequestException('Você não pode atualizar este adesivo');
    }

    if (updateUserStickerDto.userId) {
      const user = await this.usersRepo.findOneBy({
        id: updateUserStickerDto.userId,
      });
      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }
      sticker.user = user;
    }

    if (updateUserStickerDto.stickerId) {
      const stickerToUpdate = await this.stickerRepo.findOneBy({
        id: updateUserStickerDto.stickerId,
      });
      if (!stickerToUpdate) {
        throw new NotFoundException('Adesivo não encontrado');
      }
      sticker.sticker = stickerToUpdate;
    }
    Object.assign(sticker, updateUserStickerDto);
    return this.userStickerRepo.save(sticker);
  }

  private async checkAndReward(
    userId: number,
    totalPasted: number,
  ): Promise<boolean> {
    const milestones = [
      { count: 5, coins: 50 },
      { count: 15, coins: 80 },
      { count: 25, coins: 120 },
    ];

    const user = await this.usersRepo.findOneBy({ id: userId });
    if (!user) return false;

    let rewarded = false;

    for (const milestone of milestones) {
      if (totalPasted === milestone.count) {
        user.coins += milestone.coins;
        await this.usersRepo.save(user);
        rewarded = true;
        break;
      }
    }

    return rewarded;
  }

  async remove(id: number) {
    const sticker = await this.findOne(id);
    await this.userStickerRepo.remove(sticker);
    return { message: 'UserSticker removido com sucesso' };
  }

  async addStickerToUser(
    userId: number,
    stickerId: number,
    sponsor: string = 'DEFAULT',
  ) {
    const user = await this.usersRepo.findOneBy({ id: userId });
    const sticker = await this.stickerRepo.findOneBy({ id: stickerId });

    if (!user || !sticker) {
      throw new NotFoundException('Usuário ou adesivo não encontrado');
    }

    const existing = await this.userStickerRepo.findOne({
      where: { user: { id: userId }, sticker: { id: stickerId }, sponsor },
    });

    if (existing) {
      existing.quantity += 1;
      return this.userStickerRepo.save(existing);
    }

    const newUserSticker = this.userStickerRepo.create({
      user,
      sticker,
      sponsor,
      quantity: 1,
      pasted: false,
    });

    return this.userStickerRepo.save(newUserSticker);
  }

  async pasteStickerByUserStickerId(userStickerId: number) {
    const userSticker = await this.userStickerRepo.findOne({
      where: { id: userStickerId },
      relations: ['user'],
    });

    if (!userSticker) throw new NotFoundException('UserSticker não encontrado');

    if (userSticker.pasted) throw new BadRequestException('Essa figurinha já foi colada');

    userSticker.pasted = true;
    await this.userStickerRepo.save(userSticker);

    const user = userSticker.user;
    user.level += 1;
    await this.usersRepo.save(user);

    const totalPasted = await this.userStickerRepo.count({
      where: { user: { id: user.id }, pasted: true },
    });

    await this.checkAndReward(user.id, totalPasted);

    return userSticker;
  }

  async removeSticker(
    userId: number,
    stickerId: number,
    sponsor: string = 'DEFAULT',
  ) {
    const userSticker = await this.userStickerRepo.findOne({
      where: { user: { id: userId }, sticker: { id: stickerId }, sponsor },
    });

    if (!userSticker)
      throw new NotFoundException('Adesivo não encontrado para o usuário');

    await this.userStickerRepo.remove(userSticker);
    return { message: 'Adesivo removido' };
  }

  async getAlbumProgress(userId: number) {
    const totalAlbumStickers = 160;

    const [pastedCount] = await this.userStickerRepo
      .createQueryBuilder('userSticker')
      .leftJoin('userSticker.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('userSticker.pasted = true')
      .select('COUNT(DISTINCT userSticker.sticker)', 'count')
      .getRawMany();

    const pasted = parseInt(pastedCount?.count || '0', 10);
    const missing = totalAlbumStickers - pasted;

    return {
      total: totalAlbumStickers,
      pasted,
      missing,
      completed: pasted === totalAlbumStickers,
    };
  }

  async getUserStickersByPasted(userId: number) {
    const userStickers = await this.userStickerRepo.find({
      where: { user: { id: userId } },
      relations: ['sticker'],
    });

    const pasted = userStickers
      .filter((us) => us.pasted)
      .map((us) => us.sticker);
    const notPasted = userStickers
      .filter((us) => !us.pasted)
      .map((us) => us.sticker);

    return {
      pasted,
      notPasted,
    };
  }
}
