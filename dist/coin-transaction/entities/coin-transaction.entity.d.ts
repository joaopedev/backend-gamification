import { Users } from '../../users/entities/user.entity';
export declare class CoinTransaction {
    id: number;
    type: 'TASK' | 'QR_CODE';
    coins: number;
    user: Users;
    createdAt: Date;
}
