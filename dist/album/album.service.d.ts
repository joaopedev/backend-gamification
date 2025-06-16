import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
export declare class AlbumService {
    private readonly albumRepo;
    private readonly userRepo;
    constructor(albumRepo: Repository<Album>, userRepo: Repository<Users>);
    findAll(): Promise<Album[]>;
    findByUser(userId: number): Promise<Album | null>;
}
