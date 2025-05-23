import { CreateTradeDTO } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Trade } from './entities/trade.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Sticker } from 'src/stickers/entities/sticker.entity';
export declare class TradesService {
    private readonly tradeRepository;
    private readonly usersRepository;
    private readonly stickerRepository;
    constructor(tradeRepository: Repository<Trade>, usersRepository: Repository<Users>, stickerRepository: Repository<Sticker>);
    create(createTradeDto: CreateTradeDTO): Promise<Trade>;
    findAll(): Promise<Trade[]>;
    findOne(id: number): Promise<string>;
    findAllTradesByUserId(userId: number): Promise<Trade[]>;
    findAllReceivedTradesByUserId(userId: number): Promise<Trade[]>;
    findTradeHistoryByUserId(userId: number): Promise<Trade[]>;
    update(id: number, updateTradeDto: UpdateTradeDto): Promise<Trade>;
    remove(id: number): string;
}
