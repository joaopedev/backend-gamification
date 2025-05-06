import { StickerPackService } from './sticker-pack.service';
export declare class StickerPackController {
    private readonly service;
    constructor(service: StickerPackService);
    createFromActivity(userId: number, title: string): Promise<import("./entities/sticker-pack.entity").StickerPack>;
    createFromQRCode(userId: number, title: string, stickerIds: number[]): Promise<import("./entities/sticker-pack.entity").StickerPack>;
    findAll(): Promise<import("./entities/sticker-pack.entity").StickerPack[]>;
    findOne(id: number): Promise<import("./entities/sticker-pack.entity").StickerPack | null>;
    remove(id: number): Promise<import("./entities/sticker-pack.entity").StickerPack>;
}
