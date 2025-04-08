import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Import the User entity
import { Sticker } from '../../stickers/entities/sticker.entity'; // Import the Sticker entity
import { TradeStatus } from './tradeEnum';

@Entity()
export class Trade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.initiatedTrades)
  requester: User; // Quem solicitou a troca

  @ManyToOne(() => User, (user) => user.receivedTrades)
  receiver: User; // Quem recebeu a solicitação

  @ManyToOne(() => Sticker)
  offeredSticker: Sticker; // Figurinha oferecida

  @ManyToOne(() => Sticker)
  requestedSticker: Sticker; // Figurinha solicitada

  @Column({ type: 'enum', enum: TradeStatus, default: 'PENDING' })
  status: TradeStatus; // Status da troca (PENDING, ACCEPTED, REJECTED, CANCELED)

  @CreateDateColumn()
  createdAt: Date;
}