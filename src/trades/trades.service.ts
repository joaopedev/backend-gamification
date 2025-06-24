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
    if (!requester) throw new Error('Solicitante não encontrado');
    if (!receiver) throw new Error('Receptor não encontrado');

    const offeredUserSticker = await this.stickerRepository.findOne({
      where: {
        user: { id: createTradeDto.requesterId },
        sticker: { id: createTradeDto.offeredStickerId },
      },
    });
    if (!offeredUserSticker || offeredUserSticker.quantity < 1) {
      throw new Error('O solicitante não possui o adesivo oferecido');
    }

    const requestedUserSticker = await this.stickerRepository.findOne({
      where: {
        user: { id: createTradeDto.receiverId },
        sticker: { id: createTradeDto.requestedStickerId },
      },
    });
    if (!requestedUserSticker || requestedUserSticker.quantity < 1) {
      throw new Error('O destinatário não possui o adesivo solicitado');
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
      let trade = await manager.findOne(Trade, {
        where: { id },
        relations: [
          'offeredSticker',
          'requestedSticker',
          'requester',
          'receiver',
        ],
      });

      if (!trade) {
        throw new Error('Negociação não encontrada');
      }

      if (trade.status !== TradeStatus.PENDING) {
        throw new Error(
          'Esta troca já foi finalizada e não pode ser alterada.',
        );
      }

      await manager.update(Trade, id, updateTradeDto as DeepPartial<Trade>);

      trade = await manager.findOne(Trade, {
        where: { id },
        relations: [
          'offeredSticker',
          'requestedSticker',
          'requester',
          'receiver',
        ],
      });

      if (!trade) {
        throw new Error('Negociação não encontrada após atualização');
      }

      if (trade.status !== TradeStatus.ACCEPTED) {
        return trade;
      }

      const { requester, receiver, offeredSticker, requestedSticker } = trade;

      const transferSticker = async (
        fromUserId: number,
        toUserId: number,
        stickerId: number,
      ) => {
        // Decrementa do usuário de origem
        const fromSticker = await manager.findOne(UserSticker, {
          where: {
            user: { id: fromUserId },
            sticker: { id: stickerId },
            pasted: false,
          },
        });

        if (!fromSticker || fromSticker.quantity < 1) {
          throw new Error(
            `Usuário ${fromUserId} não possui a figurinha ${stickerId} ou ela já está colada.`,
          );
        }

        fromSticker.quantity -= 1;
        await manager.save(UserSticker, fromSticker);
        if (fromSticker.quantity === 0) {
          await manager.remove(UserSticker, fromSticker);
        }
        let toSticker = await manager.findOne(UserSticker, {
          where: {
            user: { id: toUserId },
            sticker: { id: stickerId },
            pasted: false,
          },
        });

        if (toSticker) {
          toSticker.quantity += 1;
        } else {
          toSticker = manager.create(UserSticker, {
            user: { id: toUserId },
            sticker: { id: stickerId },
            quantity: 1,
            pasted: false,
          });
        }

        await manager.save(UserSticker, toSticker);
      };

      await transferSticker(requester.id, receiver.id, offeredSticker.id);
      await transferSticker(receiver.id, requester.id, requestedSticker.id);

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
    return this.dataSource.transaction(async (manager) => {
      const trade = await manager.findOne(Trade, { where: { id } });
      if (!trade) throw new Error('Trade not found');

      await manager.remove(Trade, trade);
      return { message: 'Trade removed successfully' };
    });
  }
}
