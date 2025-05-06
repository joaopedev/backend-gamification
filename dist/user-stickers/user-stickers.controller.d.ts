import { UserStickersService } from './user-stickers.service';
import { CreateUserStickerDTO } from './dto/create-user-sticker.dto';
import { UpdateUserStickerDto } from './dto/update-user-sticker.dto';
export declare class UserStickersController {
    private readonly userStickersService;
    constructor(userStickersService: UserStickersService);
    create(createUserStickerDto: CreateUserStickerDTO): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserStickerDto: UpdateUserStickerDto): string;
    remove(id: string): string;
}
