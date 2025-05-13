import { CoinTransaction } from 'src/coin-transaction/entities/coin-transaction.entity';
import { StickerPack } from 'src/sticker-pack/entities/sticker-pack.entity';
import { Trade } from 'src/trades/entities/trade.entity';
import { UserSticker } from 'src/user-stickers/entities/user-sticker.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  confirm_password: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  image_url?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at?: Date | null; // Nullable field

  @Column({ type: 'int', default: 0 })
  stickers_number: number;

  @Column({ type: 'int', default: 120 })
  coins: number;

  @Column({ type: 'int', default: 0 })
  conquests: number;

  @OneToMany(() => CoinTransaction, (transaction) => transaction.user)
  transactions: CoinTransaction[];

  @OneToMany(() => UserSticker, (userSticker) => userSticker.user)
  userStickers: UserSticker[];

  @OneToMany(() => Trade, (trade) => trade.requester)
  initiatedTrades: Trade[];

  @OneToMany(() => Trade, (trade) => trade.receiver)
  receivedTrades: Trade[];

  @Column({ type: 'timestamp', nullable: true })
  last_login?: Date | null; // Nullable field

  @Column({ type: 'int', default: 1 })
  level: number;

  @ManyToMany(() => Users, (user) => user.friends)
  friends: Users[]; // Many-to-many relationship with other users (friends)

  @OneToMany(() => StickerPack, (pack) => pack.user)
  stickerPacks: StickerPack[];

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true, type: 'timestamp' })
  resetPasswordExpires: Date;
}
