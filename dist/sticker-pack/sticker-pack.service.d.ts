import { Repository } from 'typeorm';
import { StickerPack } from './entities/sticker-pack.entity';
import { UserSticker } from 'src/user-stickers/entities/user-sticker.entity';
import { Users } from 'src/users/entities/user.entity';
import { Sticker } from 'src/stickers/entities/sticker.entity';
export declare class StickerPackService {
    private readonly stickerPackRepo;
    private readonly userStickerRepo;
    private readonly userRepo;
    private readonly stickerRepo;
    constructor(stickerPackRepo: Repository<StickerPack>, userStickerRepo: Repository<UserSticker>, userRepo: Repository<Users>, stickerRepo: Repository<Sticker>);
    createFromCoins(userId: number, title: string): Promise<StickerPack>;
    findAll(): Promise<StickerPack[]>;
    findOne(id: number): Promise<StickerPack | null>;
    remove(id: number): Promise<StickerPack>;
}
