import { Repository } from 'typeorm';
import { StickerPack } from './entities/sticker-pack.entity';
import { UserSticker } from 'src/user-stickers/entities/user-sticker.entity';
export declare class StickerPackService {
    private readonly stickerPackRepo;
    private readonly stickerRepo;
    constructor(stickerPackRepo: Repository<StickerPack>, stickerRepo: Repository<UserSticker>);
    createFromActivity(userId: number, title: string): Promise<StickerPack>;
    createFromQRCode(userId: number, title: string, stickerIds: number[]): Promise<StickerPack>;
    findAll(): Promise<StickerPack[]>;
    findOne(id: number): Promise<StickerPack | null>;
    remove(id: number): Promise<StickerPack>;
}
