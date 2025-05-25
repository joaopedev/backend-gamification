import { UserStickersService } from './user-stickers.service';
import { CreateUserStickerDTO } from './dto/create-user-sticker.dto';
import { UpdateUserStickerDto } from './dto/update-user-sticker.dto';
import { UpdatePastedDto } from './dto/update-pasted.dto';
export declare class UserStickersController {
    private readonly userStickersService;
    constructor(userStickersService: UserStickersService);
    create(createUserStickerDto: CreateUserStickerDTO): Promise<import("./entities/user-sticker.entity").UserSticker>;
    findAll(): Promise<import("./entities/user-sticker.entity").UserSticker[]>;
    findOne(id: number): Promise<import("./entities/user-sticker.entity").UserSticker>;
    update(id: number, updateUserStickerDto: UpdateUserStickerDto, userId: number): Promise<import("./entities/user-sticker.entity").UserSticker>;
    findByUser(userId: number): Promise<import("./entities/user-sticker.entity").UserSticker[]>;
    pasteSticker(stickerId: number, req: any, body: UpdatePastedDto): Promise<{
        message: string;
        userSticker: import("./entities/user-sticker.entity").UserSticker;
    }>;
    getAlbumProgress(req: any): Promise<{
        total: number;
        pasted: number;
        missing: number;
        completed: boolean;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
