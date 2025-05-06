import { Users } from '../../users/entities/user.entity';
import { Sticker } from '../../stickers/entities/sticker.entity';
import { TradeStatus } from './tradeEnum';
export declare class Trade {
    id: number;
    requester: Users;
    receiver: Users;
    offeredSticker: Sticker;
    requestedSticker: Sticker;
    status: TradeStatus;
    createdAt: Date;
}
