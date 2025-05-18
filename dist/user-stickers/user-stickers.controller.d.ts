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
    update(id: number, updateUserStickerDto: UpdateUserStickerDto): Promise<import("./entities/user-sticker.entity").UserSticker>;
    findByUser(userId: number): Promise<import("./entities/user-sticker.entity").UserSticker[]>;
    updatePasted(id: number, body: UpdatePastedDto): Promise<import("./entities/user-sticker.entity").UserSticker>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
