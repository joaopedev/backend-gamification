import { CreateUserStickerDTO } from './dto/create-user-sticker.dto';
import { UpdateUserStickerDto } from './dto/update-user-sticker.dto';
export declare class UserStickersService {
    create(createUserStickerDto: CreateUserStickerDTO): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserStickerDto: UpdateUserStickerDto): string;
    remove(id: number): string;
}
