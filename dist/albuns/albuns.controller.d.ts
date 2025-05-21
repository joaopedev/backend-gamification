import { UpdateAlbunDto } from './dto/update-albun.dto';
import { AlbumService } from './albuns.service';
import { CreateAlbumDto } from './dto/create-albun.dto';
export declare class AlbunsController {
    private readonly albunsService;
    constructor(albunsService: AlbumService);
    create(createAlbunDto: CreateAlbumDto): Promise<import("./entities/albun.entity").Album>;
    findAll(): Promise<import("./entities/albun.entity").Album[]>;
    findOne(id: string): Promise<import("./entities/albun.entity").Album | null>;
    update(id: string, updateAlbunDto: UpdateAlbunDto): string;
    remove(id: string): string;
}
