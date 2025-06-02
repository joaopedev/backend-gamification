import { CreateTradeDTO } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Trade } from './entities/trade.entity';
import { DataSource, Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import { UserSticker } from 'src/user-stickers/entities/user-sticker.entity';
export declare class TradesService {
    private readonly tradeRepository;
    private readonly usersRepository;
    private readonly stickerRepository;
    private readonly dataSource;
    constructor(tradeRepository: Repository<Trade>, usersRepository: Repository<Users>, stickerRepository: Repository<UserSticker>, dataSource: DataSource);
    create(createTradeDto: CreateTradeDTO): Promise<Trade>;
    findAll(): Promise<Trade[]>;
    findOne(id: number): Promise<Trade>;
    findAllTradesByUserId(userId: number): Promise<Trade[]>;
    findAllReceivedTradesByUserId(userId: number): Promise<Trade[]>;
    findTradeHistoryByUserId(userId: number): Promise<Trade[]>;
    update(id: number, updateTradeDto: UpdateTradeDto): Promise<Trade | null>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
