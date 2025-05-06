import { StickersService } from './stickers.service';
import { CreateStickerDTO } from './dto/create-sticker.dto';
import { UpdateStickerDto } from './dto/update-sticker.dto';
export declare class StickersController {
    private readonly stickersService;
    constructor(stickersService: StickersService);
    create(createStickerDto: CreateStickerDTO, file: Express.Multer.File): Promise<import("./entities/sticker.entity").Sticker>;
    findAll(): Promise<import("./entities/sticker.entity").Sticker[]>;
    importExistingStickers(): Promise<{
        message: string;
    }>;
    findOne(id: string): Promise<import("./entities/sticker.entity").Sticker | null>;
    update(id: string, updateStickerDto: UpdateStickerDto): Promise<import("./entities/sticker.entity").Sticker | null>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
