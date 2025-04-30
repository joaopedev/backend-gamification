import { Injectable } from '@nestjs/common';
import { CreateTradeDTO } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trade } from './entities/trade.entity';
import { DeepPartial, Repository } from 'typeorm';
import { TradeStatus } from './entities/tradeEnum';

@Injectable()
export class TradesService {
  constructor(@InjectRepository(Trade) private readonly tradeRepository: Repository<Trade>) {}
  async create(createTradeDto: CreateTradeDTO) {
    const trade = this.tradeRepository.create({
      ...createTradeDto,
      status: createTradeDto.status as TradeStatus, // Explicitly cast status if necessary
    });
    try {
      const existingTrade = await this.tradeRepository.findOne({ where: { id: createTradeDto.receiverId } });
      if (existingTrade) {
        throw new Error('Trade already exists');
      }

      const existingSticker = await this.tradeRepository.findOne({ where: { id: createTradeDto.offeredStickerId } });
      if (existingSticker) {
        throw new Error('Sticker already exists');
      }
      const existingSticker2 = await this.tradeRepository.findOne({ where: { id: createTradeDto.requestedStickerId } });
      if (existingSticker2) {
        throw new Error('Sticker already exists');
      }
      const existingUser = await this.tradeRepository.findOne({ where: { id: createTradeDto.requesterId } });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const existingUser2 = await this.tradeRepository.findOne({ where: { id: createTradeDto.receiverId } });
      if (existingUser2) {
        throw new Error('User already exists');
      }
      const trade = this.tradeRepository.create(createTradeDto as DeepPartial<Trade>);
      await this.tradeRepository.save(trade);
    }
    catch (error) {
    return 'This action adds a new trade';}
  }

  async findAll() {
    const trades = await this.tradeRepository.find();
    return trades.map(trade => {
      return trade; // Return the trade object as is
    }
    );
  }

  async findOne(id: number) {
    const trade = await this.tradeRepository.findOne({ where: { id } });
    if (!trade) {
      throw new Error('Trade not found');
    }
    return `This action returns a #${id} trade`;
  }

  async update(id: number, updateTradeDto: UpdateTradeDto) {
    const trade = await this.tradeRepository.findOne({ where: { id } });
    if (!trade) {
      throw new Error('Trade not found');
    }
    await this.tradeRepository.update(id, updateTradeDto as DeepPartial<Trade>);
    const updatedTrade = await this.tradeRepository.findOne({ where: { id } });
    if (!updatedTrade) {
      throw new Error('Trade not found after update');
    }
    return updatedTrade; // Return the updated trade object
  }

  remove(id: number) {
    return `This action removes a #${id} trade`;
  }
}
