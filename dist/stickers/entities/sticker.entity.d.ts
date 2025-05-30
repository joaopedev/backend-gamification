import { StickerPack } from 'src/sticker-pack/entities/sticker-pack.entity';
import { UserSticker } from 'src/user-stickers/entities/user-sticker.entity';
export declare class Sticker {
    id: number;
    name: string;
    image_url: string;
    sponsor: string;
    description: string;
    stickerPack: StickerPack;
    category: string;
    section: string;
    sub_category: string;
    links?: string[];
    userStickers: UserSticker[];
}
