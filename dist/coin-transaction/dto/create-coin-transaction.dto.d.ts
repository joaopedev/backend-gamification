export declare class CreateCoinTransactionDTO {
    type: 'TASK' | 'QR_CODE';
    coins: number;
    userId: number;
    isReceived: boolean;
}
