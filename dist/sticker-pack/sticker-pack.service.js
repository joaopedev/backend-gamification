"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickerPackService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sticker_pack_entity_1 = require("./entities/sticker-pack.entity");
const sticker_entity_1 = require("../stickers/entities/sticker.entity");
let StickerPackService = class StickerPackService {
    stickerPackRepo;
    stickerRepo;
    constructor(stickerPackRepo, stickerRepo) {
        this.stickerPackRepo = stickerPackRepo;
        this.stickerRepo = stickerRepo;
    }
    async createFromActivity(userId, title) {
        const stickers = await this.stickerRepo.find({
            where: {
                user: { id: userId },
                sponsor: (0, typeorm_2.Not)('SPECIAL'),
            },
            take: 4,
        });
        if (stickers.length < 4) {
            throw new Error('Not enough stickers available for activity-based pack');
        }
        const pack = this.stickerPackRepo.create({
            title,
            user: { id: userId },
            stickers,
        });
        return this.stickerPackRepo.save(pack);
    }
    async createFromQRCode(userId, title, stickerIds) {
        const stickers = await this.stickerRepo.findByIds(stickerIds);
        if (!stickers.length) {
            throw new Error('No stickers found for QR code');
        }
        const pack = this.stickerPackRepo.create({
            title,
            user: { id: userId },
            stickers,
        });
        return this.stickerPackRepo.save(pack);
    }
    findAll() {
        return this.stickerPackRepo.find({ relations: ['stickers'] });
    }
    findOne(id) {
        return this.stickerPackRepo.findOne({ where: { id }, relations: ['stickers'] });
    }
    async remove(id) {
        const pack = await this.stickerPackRepo.findOne({ where: { id } });
        if (!pack)
            throw new Error('Sticker pack not found');
        return this.stickerPackRepo.remove(pack);
    }
};
exports.StickerPackService = StickerPackService;
exports.StickerPackService = StickerPackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sticker_pack_entity_1.StickerPack)),
    __param(1, (0, typeorm_1.InjectRepository)(sticker_entity_1.Sticker)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StickerPackService);
//# sourceMappingURL=sticker-pack.service.js.map