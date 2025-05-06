import { TradesService } from './trades.service';
import { CreateTradeDTO } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
export declare class TradesController {
    private readonly tradesService;
    constructor(tradesService: TradesService);
    create(createTradeDto: CreateTradeDTO): Promise<"This action adds a new trade" | undefined>;
    findAll(): Promise<import("./entities/trade.entity").Trade[]>;
    findOne(id: string): Promise<string>;
    update(id: string, updateTradeDto: UpdateTradeDto): Promise<import("./entities/trade.entity").Trade>;
    remove(id: string): string;
}
