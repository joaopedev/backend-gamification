import { UserStickersService } from './user-stickers.service';
import { CreateUserStickerDTO } from './dto/create-user-sticker.dto';
import { UpdateUserStickerDto } from './dto/update-user-sticker.dto';
export declare class UserStickersController {
    private readonly userStickersService;
    constructor(userStickersService: UserStickersService);
    create(createUserStickerDto: CreateUserStickerDTO): Promise<import("./entities/user-sticker.entity").UserSticker>;
    findAll(): Promise<import("./entities/user-sticker.entity").UserSticker[]>;
    findOne(id: string): Promise<import("./entities/user-sticker.entity").UserSticker>;
    update(id: string, updateUserStickerDto: UpdateUserStickerDto): Promise<import("./entities/user-sticker.entity").UserSticker>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
