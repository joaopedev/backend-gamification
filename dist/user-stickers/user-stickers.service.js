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
exports.UserStickersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_sticker_entity_1 = require("./entities/user-sticker.entity");
let UserStickersService = class UserStickersService {
    userStickerRepo;
    constructor(userStickerRepo) {
        this.userStickerRepo = userStickerRepo;
    }
    async create(createUserStickerDto) {
        const newUserSticker = this.userStickerRepo.create(createUserStickerDto);
        return this.userStickerRepo.save(newUserSticker);
    }
    async findAll() {
        return this.userStickerRepo.find({ relations: ['user', 'sticker'] });
    }
    async findOne(id) {
        const sticker = await this.userStickerRepo.findOne({
            where: { id },
            relations: ['user', 'sticker'],
        });
        if (!sticker) {
            throw new common_1.NotFoundException(`UserSticker with id ${id} not found`);
        }
        return sticker;
    }
    async update(id, updateUserStickerDto) {
        const sticker = await this.findOne(id);
        Object.assign(sticker, updateUserStickerDto);
        return this.userStickerRepo.save(sticker);
    }
    async remove(id) {
        const sticker = await this.findOne(id);
        await this.userStickerRepo.remove(sticker);
        return { message: 'UserSticker removed successfully' };
    }
    async addStickerToUser(userId, stickerId, sponsor = 'DEFAULT') {
        const existing = await this.userStickerRepo.findOne({
            where: { user: { id: userId }, sticker: { id: stickerId }, sponsor },
        });
        if (existing) {
            existing.quantity += 1;
            return this.userStickerRepo.save(existing);
        }
        const newUserSticker = this.userStickerRepo.create({
            user: { id: userId },
            sticker: { id: stickerId },
            sponsor,
            quantity: 1,
            pasted: false,
        });
        return this.userStickerRepo.save(newUserSticker);
    }
    async pasteSticker(userId, stickerId, sponsor = 'DEFAULT') {
        const userSticker = await this.userStickerRepo.findOne({
            where: { user: { id: userId }, sticker: { id: stickerId }, sponsor },
        });
        if (!userSticker)
            throw new common_1.NotFoundException('User does not own this sticker');
        if (userSticker.pasted)
            throw new common_1.BadRequestException('Sticker already pasted');
        userSticker.pasted = true;
        return this.userStickerRepo.save(userSticker);
    }
    async getUserStickers(userId) {
        return this.userStickerRepo.find({
            where: { user: { id: userId } },
            relations: ['sticker'],
        });
    }
    async removeSticker(userId, stickerId, sponsor = 'DEFAULT') {
        const userSticker = await this.userStickerRepo.findOne({
            where: { user: { id: userId }, sticker: { id: stickerId }, sponsor },
        });
        if (!userSticker)
            throw new common_1.NotFoundException('Sticker not found for user');
        await this.userStickerRepo.remove(userSticker);
        return { message: 'Sticker removed' };
    }
};
exports.UserStickersService = UserStickersService;
exports.UserStickersService = UserStickersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_sticker_entity_1.UserSticker)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserStickersService);
//# sourceMappingURL=user-stickers.service.js.map