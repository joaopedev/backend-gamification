import { CreateTradeDTO } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Trade } from './entities/trade.entity';
import { Repository } from 'typeorm';
export declare class TradesService {
    private readonly tradeRepository;
    constructor(tradeRepository: Repository<Trade>);
    create(createTradeDto: CreateTradeDTO): Promise<"This action adds a new trade" | undefined>;
    findAll(): Promise<Trade[]>;
    findOne(id: number): Promise<string>;
    update(id: number, updateTradeDto: UpdateTradeDto): Promise<Trade>;
    remove(id: number): string;
}
