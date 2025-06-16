import { AlbumService } from './album.service';
export declare class AlbumController {
    private readonly albumService;
    constructor(albumService: AlbumService);
    findAll(): Promise<import("./entities/album.entity").Album[]>;
    findByUser(userId: number): Promise<import("./entities/album.entity").Album | null>;
}
