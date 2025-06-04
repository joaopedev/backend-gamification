import { UserStickersService } from './user-stickers.service';
import { CreateUserStickerDTO } from './dto/create-user-sticker.dto';
import { UpdateUserStickerDto } from './dto/update-user-sticker.dto';
export declare class UserStickersController {
    private readonly userStickersService;
    constructor(userStickersService: UserStickersService);
    create(createUserStickerDto: CreateUserStickerDTO): Promise<import("./entities/user-sticker.entity").UserSticker>;
    findAll(): Promise<import("./entities/user-sticker.entity").UserSticker[]>;
    findOne(id: number): Promise<import("./entities/user-sticker.entity").UserSticker>;
    update(id: number, updateUserStickerDto: UpdateUserStickerDto, userId: number): Promise<import("./entities/user-sticker.entity").UserSticker>;
    findByUser(userId: number): Promise<import("./entities/user-sticker.entity").UserSticker[]>;
    pasteStickerById(id: number): Promise<{
        message: string;
        userSticker: import("./entities/user-sticker.entity").UserSticker;
    }>;
    getAlbumProgress(req: any): Promise<{
        total: number;
        pasted: number;
        missing: number;
        completed: boolean;
    }>;
    syncStickersNumber(): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
