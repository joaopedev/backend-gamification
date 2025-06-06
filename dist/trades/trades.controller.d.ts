import { TradesService } from './trades.service';
import { CreateTradeDTO } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
export declare class TradesController {
    private readonly tradesService;
    constructor(tradesService: TradesService);
    create(createTradeDto: CreateTradeDTO): Promise<import("./entities/trade.entity").Trade>;
    findAll(): Promise<import("./entities/trade.entity").Trade[]>;
    findOne(id: string): Promise<import("./entities/trade.entity").Trade>;
    findAllTradesByUserId(userId: string): Promise<import("./entities/trade.entity").Trade[]>;
    findAllReceivedTradesByUserId(userId: string): Promise<import("./entities/trade.entity").Trade[]>;
    findTradeHistoryByUserId(userId: string): Promise<import("./entities/trade.entity").Trade[]>;
    update(id: string, updateTradeDto: UpdateTradeDto): Promise<import("./entities/trade.entity").Trade | null>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
