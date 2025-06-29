import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserLevelDto } from './dto/update-user-level.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        name: string;
        username: string;
        confirm_password: string;
        email: string;
        image_url: string;
        updated_at: Date;
        created_at: Date;
        deleted_at?: Date | null;
        stickers_number: number;
        coins: number;
        conquests: number;
        transactions: import("../coin-transaction/entities/coin-transaction.entity").CoinTransaction[];
        initiatedTrades: import("../trades/entities/trade.entity").Trade[];
        receivedTrades: import("../trades/entities/trade.entity").Trade[];
        last_login?: Date | null;
        level: number;
        friends: import("./entities/user.entity").Users[];
        stickerPacks: import("../sticker-pack/entities/sticker-pack.entity").StickerPack[];
        userStickers: import("../user-stickers/entities/user-sticker.entity").UserSticker[];
        resetPasswordToken: string;
        resetPasswordExpires: Date;
        albumcompleted: import("../album/entities/album.entity").Album;
    }>;
    findAll(): Promise<{
        album: import("../album/entities/album.entity").Album;
        id: number;
        name: string;
        username: string;
        confirm_password: string;
        email: string;
        image_url: string;
        updated_at: Date;
        created_at: Date;
        deleted_at?: Date | null;
        stickers_number: number;
        coins: number;
        conquests: number;
        transactions: import("../coin-transaction/entities/coin-transaction.entity").CoinTransaction[];
        initiatedTrades: import("../trades/entities/trade.entity").Trade[];
        receivedTrades: import("../trades/entities/trade.entity").Trade[];
        last_login?: Date | null;
        level: number;
        friends: import("./entities/user.entity").Users[];
        stickerPacks: import("../sticker-pack/entities/sticker-pack.entity").StickerPack[];
        userStickers: import("../user-stickers/entities/user-sticker.entity").UserSticker[];
        resetPasswordToken: string;
        resetPasswordExpires: Date;
    }[]>;
    findAllWithEmail(): Promise<string[]>;
    findOne(id: number): Promise<{
        album: import("../album/entities/album.entity").Album;
        id: number;
        name: string;
        username: string;
        email: string;
        image_url: string;
        updated_at: Date;
        created_at: Date;
        deleted_at?: Date | null;
        stickers_number: number;
        coins: number;
        conquests: number;
        transactions: import("../coin-transaction/entities/coin-transaction.entity").CoinTransaction[];
        initiatedTrades: import("../trades/entities/trade.entity").Trade[];
        receivedTrades: import("../trades/entities/trade.entity").Trade[];
        last_login?: Date | null;
        level: number;
        friends: import("./entities/user.entity").Users[];
        stickerPacks: import("../sticker-pack/entities/sticker-pack.entity").StickerPack[];
        userStickers: import("../user-stickers/entities/user-sticker.entity").UserSticker[];
        resetPasswordToken: string;
        resetPasswordExpires: Date;
        albumcompleted: import("../album/entities/album.entity").Album;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        album: import("../album/entities/album.entity").Album;
        id: number;
        name: string;
        username: string;
        email: string;
        image_url: string;
        updated_at: Date;
        created_at: Date;
        deleted_at?: Date | null;
        stickers_number: number;
        coins: number;
        conquests: number;
        transactions: import("../coin-transaction/entities/coin-transaction.entity").CoinTransaction[];
        initiatedTrades: import("../trades/entities/trade.entity").Trade[];
        receivedTrades: import("../trades/entities/trade.entity").Trade[];
        last_login?: Date | null;
        level: number;
        friends: import("./entities/user.entity").Users[];
        stickerPacks: import("../sticker-pack/entities/sticker-pack.entity").StickerPack[];
        userStickers: import("../user-stickers/entities/user-sticker.entity").UserSticker[];
        resetPasswordToken: string;
        resetPasswordExpires: Date;
        albumcompleted: import("../album/entities/album.entity").Album;
    }>;
    updateLevel(id: number, dto: UpdateUserLevelDto): Promise<{
        album: import("../album/entities/album.entity").Album;
        id: number;
        name: string;
        username: string;
        email: string;
        image_url: string;
        updated_at: Date;
        created_at: Date;
        deleted_at?: Date | null;
        stickers_number: number;
        coins: number;
        conquests: number;
        transactions: import("../coin-transaction/entities/coin-transaction.entity").CoinTransaction[];
        initiatedTrades: import("../trades/entities/trade.entity").Trade[];
        receivedTrades: import("../trades/entities/trade.entity").Trade[];
        last_login?: Date | null;
        level: number;
        friends: import("./entities/user.entity").Users[];
        stickerPacks: import("../sticker-pack/entities/sticker-pack.entity").StickerPack[];
        userStickers: import("../user-stickers/entities/user-sticker.entity").UserSticker[];
        resetPasswordToken: string;
        resetPasswordExpires: Date;
        albumcompleted: import("../album/entities/album.entity").Album;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
