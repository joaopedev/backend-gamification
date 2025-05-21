import { TradeStatus } from '../entities/tradeEnum';
export declare class CreateTradeDTO {
    requesterId: number;
    receiverId: number;
    offeredStickerId: number;
    requestedStickerId: number;
    status: TradeStatus;
}
