import { Users } from 'src/users/entities/user.entity';
import { Sticker } from 'src/stickers/entities/sticker.entity';
export declare class StickerPack {
    id: number;
    title: string;
    user: Users;
    stickers: Sticker[];
}
