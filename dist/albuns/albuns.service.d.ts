import { CreateAlbumDto } from './dto/create-albun.dto';
import { UpdateAlbunDto } from './dto/update-albun.dto';
import { Repository } from 'typeorm';
import { Album } from './entities/albun.entity';
export declare class AlbumService {
    private repo;
    constructor(repo: Repository<Album>);
    create(dto: CreateAlbumDto): Promise<Album>;
    findAll(): Promise<Album[]>;
    findOne(id: number): Promise<Album | null>;
    update(id: number, updateAlbunDto: UpdateAlbunDto): string;
    remove(id: number): string;
}
