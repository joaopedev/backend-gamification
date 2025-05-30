import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCoinTransactionDTO } from './dto/create-coin-transaction.dto';
import { UpdateCoinTransactionDto } from './dto/update-coin-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CoinTransaction } from './entities/coin-transaction.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class CoinTransactionService {
  constructor(
    @InjectRepository(CoinTransaction)
    private coinTransactionRepo: Repository<CoinTransaction>,

    @InjectRepository(Users)
    private usersRepo: Repository<Users>,
  ) {}

  async create(createCoinTransactionDto: CreateCoinTransactionDTO) {
    const { userId, coins, type, qrCodeId } = createCoinTransactionDto;

    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    if (type === 'QR_CODE') {
      if (!qrCodeId) {
        throw new BadRequestException(
          'QR Code ID é obrigatório para transações do tipo QR_CODE',
        );
      }

      const existing = await this.coinTransactionRepo.findOne({
        where: { user: { id: userId }, type: 'QR_CODE', qrCodeId },
      });

      if (existing) {
        throw new BadRequestException(
          'Este QR Code já foi utilizado por este usuário',
        );
      }
    }

    user.coins += coins;
    await this.usersRepo.save(user);

    const transaction = this.coinTransactionRepo.create({
      user,
      coins,
      type,
      isReceived: true,
      qrCodeId: qrCodeId ?? undefined,
    });

    await this.coinTransactionRepo.save(transaction);

    return transaction;
  }

  findAll() {
    return `This action returns all coinTransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coinTransaction`;
  }

  update(id: number, updateCoinTransactionDto: UpdateCoinTransactionDto) {
    return `This action updates a #${id} coinTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} coinTransaction`;
  }
}
