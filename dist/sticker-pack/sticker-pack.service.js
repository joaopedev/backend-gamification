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
    async createFromCoins(userId, title, quantity) {
        const STICKER_COUNT = 4;
        const MAX_ATTEMPTS = 100;
        const priceTable = {
            1: 50,
            3: 120,
            5: 180,
        };
        if (![1, 3, 5].includes(quantity)) {
            throw new common_1.BadRequestException('Quantidade inválida. Deve ser 1, 3 ou 5.');
        }
        const PACK_COST = priceTable[quantity];
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado');
        if (user.coins < PACK_COST) {
            throw new common_1.BadRequestException('Não há moedas suficientes para comprar pacotes de figurinhas');
        }
        const allStickers = await this.stickerRepo.find();
        if (allStickers.length === 0) {
            throw new common_1.BadRequestException('Não há figurinhas disponíveis para montar os pacotes.');
        }
        const userExistingStickers = await this.userStickerRepo.find({
            where: { user: { id: userId } },
            relations: ['sticker'],
        });
        const userOwnedStickerIds = new Set(userExistingStickers.map((us) => us.sticker.id));
        const newStickersForUser = allStickers.filter((sticker) => !userOwnedStickerIds.has(sticker.id));
        if (newStickersForUser.length < quantity * STICKER_COUNT) {
            throw new common_1.BadRequestException('“Você adquiriu todas as figurinhas do álbum”');
        }
        const allSelectedStickers = [];
        const usedStickerIdsForThisPurchase = new Set();
        let attempts = 0;
        while (allSelectedStickers.length < quantity * STICKER_COUNT &&
            attempts < MAX_ATTEMPTS * quantity) {
            const randomIndex = Math.floor(Math.random() * newStickersForUser.length);
            const sticker = newStickersForUser[randomIndex];
            if (!sticker || usedStickerIdsForThisPurchase.has(sticker.id)) {
                attempts++;
                continue;
            }
            usedStickerIdsForThisPurchase.add(sticker.id);
            allSelectedStickers.push(sticker);
            attempts++;
        }
        if (allSelectedStickers.length < quantity * STICKER_COUNT) {
            throw new common_1.BadRequestException('Não foi possível encontrar figurinhas novas qualificadas suficientes para os pacotes. Tente novamente.');
        }
        const userStickers = [];
        const packs = [];
        for (let i = 0; i < quantity; i++) {
            const packStickers = allSelectedStickers.slice(i * STICKER_COUNT, (i + 1) * STICKER_COUNT);
            const newUserStickers = packStickers.map((sticker) => this.userStickerRepo.create({
                user,
                sticker,
                quantity: 1,
                pasted: false,
            }));
            userStickers.push(...newUserStickers);
            const pack = this.stickerPackRepo.create({
                title: `${title} ${i + 1}`,
                user,
                stickers: packStickers,
            });
            packs.push(pack);
        }
        await this.userStickerRepo.save(userStickers);
        user.coins -= PACK_COST;
        await this.userRepo.save(user);
        return this.stickerPackRepo.save(packs);
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
            throw new Error('Pacote de figurinhas não encontrado');
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