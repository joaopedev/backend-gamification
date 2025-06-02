import { CoinTransaction } from 'src/coin-transaction/entities/coin-transaction.entity';
import { StickerPack } from 'src/sticker-pack/entities/sticker-pack.entity';
import { Trade } from 'src/trades/entities/trade.entity';
import { UserSticker } from 'src/user-stickers/entities/user-sticker.entity';
export declare class Users {
    id: number;
    name: string;
    username: string;
    password: string;
    confirm_password: string;
    email: string;
    image_url: string;
    updated_at: Date;
    created_at: Date;
    deleted_at?: Date | null;
    stickers_number: number;
    coins: number;
    conquests: number;
    transactions: CoinTransaction[];
    initiatedTrades: Trade[];
    receivedTrades: Trade[];
    last_login?: Date | null;
    level: number;
    friends: Users[];
    stickerPacks: StickerPack[];
    userStickers: UserSticker[];
    resetPasswordToken: string;
    resetPasswordExpires: Date;
}
