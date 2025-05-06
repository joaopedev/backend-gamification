export declare class CreateTradeDTO {
    requesterId: number;
    receiverId: number;
    offeredStickerId: number;
    requestedStickerId: number;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}
