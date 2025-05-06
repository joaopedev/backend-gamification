import { CoinTransactionService } from './coin-transaction.service';
import { CreateCoinTransactionDTO } from './dto/create-coin-transaction.dto';
import { UpdateCoinTransactionDto } from './dto/update-coin-transaction.dto';
export declare class CoinTransactionController {
    private readonly coinTransactionService;
    constructor(coinTransactionService: CoinTransactionService);
    create(createCoinTransactionDto: CreateCoinTransactionDTO): Promise<import("./entities/coin-transaction.entity").CoinTransaction>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCoinTransactionDto: UpdateCoinTransactionDto): string;
    remove(id: string): string;
}
