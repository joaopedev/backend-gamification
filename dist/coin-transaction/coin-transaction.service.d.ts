import { CreateCoinTransactionDTO } from './dto/create-coin-transaction.dto';
import { UpdateCoinTransactionDto } from './dto/update-coin-transaction.dto';
import { CoinTransaction } from './entities/coin-transaction.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
export declare class CoinTransactionService {
    private coinTransactionRepo;
    private usersRepo;
    constructor(coinTransactionRepo: Repository<CoinTransaction>, usersRepo: Repository<Users>);
    create(createCoinTransactionDto: CreateCoinTransactionDTO): Promise<CoinTransaction>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCoinTransactionDto: UpdateCoinTransactionDto): string;
    remove(id: number): string;
}
