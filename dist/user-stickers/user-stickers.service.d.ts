import { Repository } from 'typeorm';
import { UserSticker } from './entities/user-sticker.entity';
import { CreateUserStickerDTO } from './dto/create-user-sticker.dto';
import { UpdateUserStickerDto } from './dto/update-user-sticker.dto';
import { Users } from 'src/users/entities/user.entity';
import { Sticker } from 'src/stickers/entities/sticker.entity';
import { Album } from 'src/album/entities/album.entity';
export declare class UserStickersService {
    private readonly userStickerRepo;
    private readonly usersRepo;
    private readonly albumRepo;
    private readonly stickerRepo;
    constructor(userStickerRepo: Repository<UserSticker>, usersRepo: Repository<Users>, albumRepo: Repository<Album>, stickerRepo: Repository<Sticker>);
    create(createUserStickerDto: CreateUserStickerDTO): Promise<UserSticker>;
    findAll(): Promise<UserSticker[]>;
    findOne(id: number): Promise<UserSticker>;
    findByUser(userId: number): Promise<UserSticker[]>;
    update(id: number, updateUserStickerDto: UpdateUserStickerDto, userId: number): Promise<UserSticker>;
    private checkAndReward;
    syncAllUsersStickerNumbers(): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    addStickerToUser(userId: number, stickerId: number, sponsor?: string): Promise<UserSticker>;
    pasteStickerByUserStickerId(userStickerId: number): Promise<UserSticker>;
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
