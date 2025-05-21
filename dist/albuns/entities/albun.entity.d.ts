import { Users } from "src/users/entities/user.entity";
export declare class Album {
    id: number;
    title: string;
    description?: string;
    total_stickers: number;
    image_url?: string;
    stickers?: number[];
    users: Users[];
}
