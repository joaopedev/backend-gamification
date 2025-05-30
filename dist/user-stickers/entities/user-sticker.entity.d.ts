import { Users } from '../../users/entities/user.entity';
import { Sticker } from '../../stickers/entities/sticker.entity';
export declare class UserSticker {
    id: number;
    user: Users;
    sticker: Sticker;
    quantity: number;
    sponsor: string;
    pasted: boolean;
    albums: Users;
}
