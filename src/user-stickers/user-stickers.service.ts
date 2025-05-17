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

@Injectable()
export class UserStickersService {
  constructor(
    @InjectRepository(UserSticker)
    private readonly userStickerRepo: Repository<UserSticker>,
  ) {}

  async create(createUserStickerDto: CreateUserStickerDTO) {
    const { userId, stickerId = 0 } = createUserStickerDto;

    const newUserSticker = this.userStickerRepo.create({
      user: { id: Number(userId) } as any,
      sticker: { id: Number(stickerId) } as any,
      quantity: 1,
      pasted: false,
    });

    return this.userStickerRepo.save(newUserSticker);
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

  async update(id: number, updateUserStickerDto: UpdateUserStickerDto) {
    const sticker = await this.findOne(id);
    Object.assign(sticker, updateUserStickerDto);
    return this.userStickerRepo.save(sticker);
  }

  async remove(id: number) {
    const sticker = await this.findOne(id);
    await this.userStickerRepo.remove(sticker);
    return { message: 'UserSticker removed successfully' };
  }

  async addStickerToUser(
    userId: number,
    stickerId: number,
    sponsor: string = 'DEFAULT',
  ) {
    const existing = await this.userStickerRepo.findOne({
      where: { user: { id: userId }, sticker: { id: stickerId }, sponsor },
    });

    if (existing) {
      existing.quantity += 1;
      return this.userStickerRepo.save(existing);
    }

    const newUserSticker = this.userStickerRepo.create({
      user: { id: userId } as any,
      sticker: { id: stickerId } as any,
      sponsor,
      quantity: 1,
      pasted: false,
    });

    return this.userStickerRepo.save(newUserSticker);
  }

  async pasteSticker(
    userId: number,
    stickerId: number,
    sponsor: string = 'DEFAULT',
  ) {
    const userSticker = await this.userStickerRepo.findOne({
      where: { user: { id: userId }, sticker: { id: stickerId }, sponsor },
    });

    if (!userSticker)
      throw new NotFoundException('User does not own this sticker');
    if (userSticker.pasted)
      throw new BadRequestException('Sticker already pasted');

    userSticker.pasted = true;
    return this.userStickerRepo.save(userSticker);
  }

  async getUserStickers(userId: number) {
    return this.userStickerRepo.find({
      where: { user: { id: userId } },
      relations: ['sticker'],
    });
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
      throw new NotFoundException('Sticker not found for user');

    await this.userStickerRepo.remove(userSticker);
    return { message: 'Sticker removed' };
  }
}
