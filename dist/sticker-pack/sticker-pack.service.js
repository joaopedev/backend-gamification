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
const user_sticker_entity_1 = require("../user-stickers/entities/user-sticker.entity");
const user_entity_1 = require("../users/entities/user.entity");
const sticker_entity_1 = require("../stickers/entities/sticker.entity");
let StickerPackService = class StickerPackService {
    stickerPackRepo;
    userStickerRepo;
    userRepo;
    stickerRepo;
    constructor(stickerPackRepo, userStickerRepo, userRepo, stickerRepo) {
        this.stickerPackRepo = stickerPackRepo;
        this.userStickerRepo = userStickerRepo;
        this.userRepo = userRepo;
        this.stickerRepo = stickerRepo;
    }
    async createFromCoins(userId, title) {
        const PACK_COST = 100;
        const STICKER_COUNT = 4;
        const MAX_ATTEMPTS = 100;
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['userStickers', 'userStickers.sticker'],
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.coins < PACK_COST) {
            throw new common_1.BadRequestException('Not enough coins to purchase a sticker pack');
        }
        const ownedStickerIds = new Set(user.userStickers.map((us) => us.sticker.id));
        const selectedStickers = [];
        const selectedIds = new Set();
        let attempts = 0;
        while (selectedStickers.length < STICKER_COUNT && attempts < MAX_ATTEMPTS) {
            const randomId = Math.floor(Math.random() * 260) + 1;
            if (selectedIds.has(randomId) || ownedStickerIds.has(randomId)) {
                attempts++;
                continue;
            }
            const sticker = await this.stickerRepo.findOne({
                where: { id: randomId },
            });
            if (!sticker || sticker.sponsor === 'SPECIAL') {
                attempts++;
                continue;
            }
            selectedStickers.push(sticker);
            selectedIds.add(randomId);
        }
        if (selectedStickers.length < STICKER_COUNT) {
            throw new common_1.BadRequestException('Could not find enough eligible stickers');
        }
        const userStickers = selectedStickers.map((sticker) => this.userStickerRepo.create({
            user,
            sticker,
            quantity: 1,
            sponsor: sticker.sponsor,
            pasted: false,
        }));
        await this.userStickerRepo.save(userStickers);
        user.coins -= PACK_COST;
        await this.userRepo.save(user);
        const pack = this.stickerPackRepo.create({
            title,
            user,
            stickers: selectedStickers,
        });
        return this.stickerPackRepo.save(pack);
    }
    findAll() {
        return this.stickerPackRepo.find({ relations: ['stickers'] });
    }
    findOne(id) {
        return this.stickerPackRepo.findOne({
            where: { id },
            relations: ['stickers'],
        });
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
    __param(1, (0, typeorm_1.InjectRepository)(user_sticker_entity_1.UserSticker)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __param(3, (0, typeorm_1.InjectRepository)(sticker_entity_1.Sticker)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StickerPackService);
//# sourceMappingURL=sticker-pack.service.js.map