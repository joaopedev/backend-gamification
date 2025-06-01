import { Injectable } from '@nestjs/common';
import { CreateTradeDTO } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trade } from './entities/trade.entity';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { TradeStatus } from './entities/tradeEnum';
import { Users } from 'src/users/entities/user.entity';
import { Sticker } from 'src/stickers/entities/sticker.entity';
import { UserSticker } from 'src/user-stickers/entities/user-sticker.entity';

@Injectable()
export class TradesService {
  constructor(
    @InjectRepository(Trade)
    private readonly tradeRepository: Repository<Trade>,

    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,

    @InjectRepository(UserSticker)
    private readonly stickerRepository: Repository<UserSticker>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createTradeDto: CreateTradeDTO): Promise<Trade> {
    const requester = await this.usersRepository.findOne({
      where: { id: createTradeDto.requesterId },
    });
    const receiver = await this.usersRepository.findOne({
      where: { id: createTradeDto.receiverId },
    });
    if (!requester) throw new Error('Requester not found');
    if (!receiver) throw new Error('Receiver not found');

    const offeredUserSticker = await this.stickerRepository.findOne({
      where: {
        user: { id: createTradeDto.requesterId },
        sticker: { id: createTradeDto.offeredStickerId },
      },
    });
    if (!offeredUserSticker || offeredUserSticker.quantity < 1) {
      throw new Error('Requester does not have the offered sticker');
    }

    const requestedUserSticker = await this.stickerRepository.findOne({
      where: {
        user: { id: createTradeDto.receiverId },
        sticker: { id: createTradeDto.requestedStickerId },
      },
    });
    if (!requestedUserSticker || requestedUserSticker.quantity < 1) {
      throw new Error('Receiver does not have the requested sticker');
    }

    const existingTrade = await this.tradeRepository.findOne({
      where: {
        requester: { id: createTradeDto.requesterId },
        receiver: { id: createTradeDto.receiverId },
        offeredSticker: { id: createTradeDto.offeredStickerId },
        requestedSticker: { id: createTradeDto.requestedStickerId },
        status: TradeStatus.PENDING,
      },
      relations: [
        'requester',
        'receiver',
        'offeredSticker',
        'requestedSticker',
      ],
    });

    if (existingTrade) {
      throw new Error('Já existe uma troca pendente com esses dados');
    }

    const trade = this.tradeRepository.create({
      requester: requester,
      receiver: receiver,
      offeredSticker: { id: createTradeDto.offeredStickerId } as Sticker,
      requestedSticker: { id: createTradeDto.requestedStickerId } as Sticker,
      status: createTradeDto.status ?? TradeStatus.PENDING,
    });

    return await this.tradeRepository.save(trade);
  }

  async findAll() {
    return await this.tradeRepository.find({
      relations: [
        'requester',
        'receiver',
        'offeredSticker',
        'requestedSticker',
      ],
    });
  }

  async findOne(id: number) {
    const trade = await this.tradeRepository.findOne({
      where: { id },
      relations: [
        'requester',
        'receiver',
        'offeredSticker',
        'requestedSticker',
      ],
    });
    if (!trade) {
      throw new Error('Trade not found');
    }
    return trade;
  }

  async findAllTradesByUserId(userId: number) {
    return await this.tradeRepository.find({
      where: { requester: { id: userId } },
      relations: [
        'requester',
        'receiver',
        'offeredSticker',
        'requestedSticker',
      ],
    });
  }

  async findAllReceivedTradesByUserId(userId: number) {
    return await this.tradeRepository.find({
      where: { receiver: { id: userId } },
      relations: [
        'requester',
        'receiver',
        'offeredSticker',
        'requestedSticker',
      ],
    });
  }

  async findTradeHistoryByUserId(userId: number) {
    return await this.tradeRepository.find({
      where: [{ requester: { id: userId } }, { receiver: { id: userId } }],
      relations: [
        'requester',
        'receiver',
        'offeredSticker',
        'requestedSticker',
      ],
    });
  }

  async update(id: number, updateTradeDto: UpdateTradeDto) {
    return await this.dataSource.transaction(async (manager) => {
      const trade = await manager.findOne(Trade, {
        where: { id },
        relations: [
          'offeredSticker',
          'requestedSticker',
          'requester',
          'receiver',
        ],
      });
      if (!trade) throw new Error('Trade not found');

      await manager.update(Trade, id, updateTradeDto as DeepPartial<Trade>);

      if (updateTradeDto.status !== TradeStatus.ACCEPTED) {
        return await manager.findOne(Trade, {
          where: { id },
          relations: [
            'offeredSticker',
            'requestedSticker',
            'requester',
            'receiver',
          ],
        });
      }

      const { requester, receiver, offeredSticker, requestedSticker } = trade;

      const updateSticker = async (
        fromUserId: number,
        toUserId: number,
        stickerId: number,
      ) => {
        const fromUserSticker = await manager.findOne(UserSticker, {
          where: {
            user: { id: fromUserId },
            sticker: { id: stickerId },
          },
        });
        if (!fromUserSticker || fromUserSticker.quantity < 1) {
          throw new Error(
            `User ${fromUserId} does not own sticker ${stickerId}`,
          );
        }
        fromUserSticker.quantity -= 1;
        await manager.save(UserSticker, fromUserSticker);

        let toUserSticker = await manager.findOne(UserSticker, {
          where: {
            user: { id: toUserId },
            sticker: { id: stickerId },
          },
        });

        if (toUserSticker) {
          toUserSticker.quantity += 1;
        } else {
          toUserSticker = manager.create(UserSticker, {
            user: { id: toUserId },
            sticker: { id: stickerId },
            quantity: 1,
          });
        }
        await manager.save(UserSticker, toUserSticker);
      };

      // Efetuar a troca
      await updateSticker(requester.id, receiver.id, offeredSticker.id);
      await updateSticker(receiver.id, requester.id, requestedSticker.id);

      return await manager.findOne(Trade, {
        where: { id },
        relations: [
          'offeredSticker',
          'requestedSticker',
          'requester',
          'receiver',
        ],
      });
    });
  }

  remove(id: number) {
    return `This action removes a #${id} trade`;
  }
}
