import { Repository } from 'typeorm';
import { UserSticker } from './entities/user-sticker.entity';
import { CreateUserStickerDTO } from './dto/create-user-sticker.dto';
import { UpdateUserStickerDto } from './dto/update-user-sticker.dto';
export declare class UserStickersService {
    private readonly userStickerRepo;
    constructor(userStickerRepo: Repository<UserSticker>);
    create(createUserStickerDto: CreateUserStickerDTO): Promise<UserSticker>;
    findAll(): Promise<UserSticker[]>;
    findOne(id: number): Promise<UserSticker>;
    update(id: number, updateUserStickerDto: UpdateUserStickerDto): Promise<UserSticker>;
    remove(id: number): Promise<{
        message: string;
    }>;
    addStickerToUser(userId: number, stickerId: number, sponsor?: string): Promise<UserSticker>;
    pasteSticker(userId: number, stickerId: number, sponsor?: string): Promise<UserSticker>;
    getUserStickers(userId: number): Promise<UserSticker[]>;
    removeSticker(userId: number, stickerId: number, sponsor?: string): Promise<{
        message: string;
    }>;
}
