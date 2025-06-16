import { Users } from 'src/users/entities/user.entity';
export declare class Album {
    id: number;
    user: Users;
    completed: boolean;
    completed_at: Date;
}
