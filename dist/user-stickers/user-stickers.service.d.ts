import { Repository } from 'typeorm';
import { UserSticker } from './entities/user-sticker.entity';
import { CreateUserStickerDTO } from './dto/create-user-sticker.dto';
import { UpdateUserStickerDto } from './dto/update-user-sticker.dto';
import { Users } from 'src/users/entities/user.entity';
import { Sticker } from 'src/stickers/entities/sticker.entity';
export declare class UserStickersService {
    private readonly userStickerRepo;
    private readonly usersRepo;
    private readonly stickerRepo;
    constructor(userStickerRepo: Repository<UserSticker>, usersRepo: Repository<Users>, stickerRepo: Repository<Sticker>);
    create(createUserStickerDto: CreateUserStickerDTO): Promise<UserSticker>;
    findAll(): Promise<UserSticker[]>;
    findOne(id: number): Promise<UserSticker>;
    findByUser(userId: number): Promise<Sticker[]>;
    update(id: number, updateUserStickerDto: UpdateUserStickerDto): Promise<UserSticker>;
    updatePasted(id: number, pasted: boolean): Promise<UserSticker>;
    remove(id: number): Promise<{
        message: string;
    }>;
    addStickerToUser(userId: number, stickerId: number, sponsor?: string): Promise<UserSticker>;
    pasteSticker(userId: number, stickerId: number, sponsor?: string): Promise<UserSticker>;
    getUserStickers(userId: number): Promise<UserSticker[]>;
    removeSticker(userId: number, stickerId: number, sponsor?: string): Promise<{
        message: string;
    }>;
    getAlbumProgress(userId: number): Promise<{
        total: number;
        pasted: number;
        missing: number;
        completed: boolean;
    }>;
    getUserStickersByPasted(userId: number): Promise<{
        pasted: Sticker[];
        notPasted: Sticker[];
    }>;
}
