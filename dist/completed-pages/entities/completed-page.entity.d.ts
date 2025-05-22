import { Users } from 'src/users/entities/user.entity';
export declare class CompletedPage {
    id: number;
    user: Users;
    page_index: number;
    ticket: string;
    completed_at: Date;
}
