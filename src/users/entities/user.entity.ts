import { CoinTransaction } from "src/coin-transaction/entities/coin-transaction.entity";
import { Trade } from "src/trades/entities/trade.entity";
import { UserSticker } from "src/user-stickers/entities/user-sticker.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 100 })
    password: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at?: Date | null; // Nullable field

    @Column({ type: 'int', default: 0 })
    stickers_number: number;

    @Column({ type: 'int', default: 0 })
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
}