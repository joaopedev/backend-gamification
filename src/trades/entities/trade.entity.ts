import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Users } from '../../users/entities/user.entity'; // Import the User entity
import { Sticker } from '../../stickers/entities/sticker.entity'; // Import the Sticker entity
import { TradeStatus } from './tradeEnum';

@Entity()
export class Trade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.initiatedTrades)
  requester: Users; // Quem solicitou a troca

  @ManyToOne(() => Users, (user) => user.receivedTrades)
  receiver: Users; // Quem recebeu a solicitação

  @ManyToOne(() => Sticker)
  offeredSticker: Sticker; // Figurinha oferecida

  @ManyToOne(() => Sticker)
  requestedSticker: Sticker; // Figurinha solicitada

  @Column({ type: 'enum', enum: TradeStatus, default: 'PENDING' })
  status: TradeStatus; // Status da troca (PENDING, ACCEPTED, REJECTED, CANCELED)

  @CreateDateColumn()
  createdAt: Date;
}