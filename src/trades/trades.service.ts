import { Injectable } from '@nestjs/common';
import { CreateTradeDTO } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trade } from './entities/trade.entity';
import { DeepPartial, Not, Repository } from 'typeorm';
import { TradeStatus } from './entities/tradeEnum';
import { Users } from 'src/users/entities/user.entity';
import { Sticker } from 'src/stickers/entities/sticker.entity';

@Injectable()
export class TradesService {
  constructor(
    @InjectRepository(Trade)
    private readonly tradeRepository: Repository<Trade>,

    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,

    @InjectRepository(Sticker)
    private readonly stickerRepository: Repository<Sticker>,
  ) {}
  async create(createTradeDto: CreateTradeDTO): Promise<Trade> {
    try {
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
        requester: { id: createTradeDto.requesterId } as Users,
        receiver: { id: createTradeDto.receiverId } as Users,
        offeredSticker: { id: createTradeDto.offeredStickerId } as Sticker,
        requestedSticker: { id: createTradeDto.requestedStickerId } as Sticker,
        status: createTradeDto.status ?? TradeStatus.PENDING,
      });

      return await this.tradeRepository.save(trade);
    } catch (error) {
      throw new Error(`Erro ao criar trade: ${error.message}`);
    }
  }

  async findAll() {
    const trades = await this.tradeRepository.find();
    return trades.map((trade) => {
      return trade;
    });
  }

  async findOne(id: number) {
    const trade = await this.tradeRepository.findOne({ where: { id } });
    if (!trade) {
      throw new Error('Trade not found');
    }
    return `This action returns a #${id} trade`;
  }

  async findAllTradesByUserId(userId: number) {
    const trades = await this.tradeRepository.find({
      where: { requester: { id: userId } },
      relations: [
        'requester',
        'receiver',
        'offeredSticker',
        'requestedSticker',
      ],
    });
    return trades;
  }

  async findAllReceivedTradesByUserId(userId: number) {
    const trades = await this.tradeRepository.find({
      where: {
        receiver: { id: userId },
      },
      relations: [
        'requester',
        'receiver',
        'offeredSticker',
        'requestedSticker',
      ],
    });
    return trades;
  }

  async findTradeHistoryByUserId(userId: number) {
    const trades = await this.tradeRepository.find({
      where: [{ requester: { id: userId } }, { receiver: { id: userId } }],
      relations: [
        'requester',
        'receiver',
        'offeredSticker',
        'requestedSticker',
      ],
    });
    return trades;
  }

  // async findAllTradesByUserIdAndStatus(userId: number, status: TradeStatus) {
  //   const trades = await this.tradeRepository.find({
  //     where: [
  //       { requester: { id: userId }, status },
  //       { receiver: { id: userId }, status },
  //     ],
  //     relations: ['requester', 'receiver', 'offeredSticker', 'requestedSticker'],
  //   });
  //   return trades.map((trade) => {
  //     return trade;
  //   });
  // }

  async update(id: number, updateTradeDto: UpdateTradeDto) {
    const trade = await this.tradeRepository.findOne({ where: { id } });
    if (!trade) {
      throw new Error('Trade not found');
    }
    await this.tradeRepository.update(id, updateTradeDto as DeepPartial<Trade>);
    const updatedTrade = await this.tradeRepository.findOne({ where: { id } });
    if (!updatedTrade) {
      throw new Error('Negociação não encontrada após atualização');
    }
    return updatedTrade; // Return the updated trade object
  }

  remove(id: number) {
    return `This action removes a #${id} trade`;
  }
}
