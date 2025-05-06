import { Repository } from 'typeorm';
import { Sticker } from './entities/sticker.entity';
import { CreateStickerDTO } from './dto/create-sticker.dto';
import { UpdateStickerDto } from './dto/update-sticker.dto';
export declare class StickersService {
    private readonly stickerRepo;
    constructor(stickerRepo: Repository<Sticker>);
    seedStickers(): Promise<void>;
    populateFromExistingImages(): Promise<{
        message: string;
    }>;
    create(createStickerDto: CreateStickerDTO, file: Express.Multer.File): Promise<Sticker>;
    findAll(): Promise<Sticker[]>;
    findOne(id: number): Promise<Sticker | null>;
    update(id: number, updateStickerDto: UpdateStickerDto): Promise<Sticker | null>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
