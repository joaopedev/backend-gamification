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
const user_entity_1 = require("../users/entities/user.entity");
const sticker_entity_1 = require("../stickers/entities/sticker.entity");
const album_entity_1 = require("../album/entities/album.entity");
let UserStickersService = class UserStickersService {
    userStickerRepo;
    usersRepo;
    albumRepo;
    stickerRepo;
    constructor(userStickerRepo, usersRepo, albumRepo, stickerRepo) {
        this.userStickerRepo = userStickerRepo;
        this.usersRepo = usersRepo;
        this.albumRepo = albumRepo;
        this.stickerRepo = stickerRepo;
    }
    async create(createUserStickerDto) {
        const { userId, stickerId = 0 } = createUserStickerDto;
        const user = await this.usersRepo.findOneOrFail({
            where: { id: Number(userId) },
        });
        const sticker = await this.stickerRepo.findOneOrFail({
            where: { id: Number(stickerId) },
        });
        const newUserSticker = this.userStickerRepo.create({
            user,
            sticker,
            quantity: 1,
            pasted: false,
        });
        return await this.userStickerRepo.save(newUserSticker);
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
    async findByUser(userId) {
        const userStickers = await this.userStickerRepo.find({
            where: {
                user: { id: userId },
            },
            relations: ['user', 'sticker'],
            order: {
                sticker: { id: 'ASC' },
            },
        });
        return userStickers;
    }
    async update(id, updateUserStickerDto, userId) {
        const sticker = await this.findOne(id);
        if (sticker.user.id !== userId) {
            throw new common_1.BadRequestException('Você não pode atualizar este adesivo');
        }
        if (updateUserStickerDto.userId) {
            const user = await this.usersRepo.findOneBy({
                id: updateUserStickerDto.userId,
            });
            if (!user) {
                throw new common_1.NotFoundException('Usuário não encontrado');
            }
            sticker.user = user;
        }
        if (updateUserStickerDto.stickerId) {
            const stickerToUpdate = await this.stickerRepo.findOneBy({
                id: updateUserStickerDto.stickerId,
            });
            if (!stickerToUpdate) {
                throw new common_1.NotFoundException('Adesivo não encontrado');
            }
            sticker.sticker = stickerToUpdate;
        }
        Object.assign(sticker, updateUserStickerDto);
        return this.userStickerRepo.save(sticker);
    }
    async checkAndReward(userId, totalPasted) {
        const milestones = [
            { count: 5, coins: 50 },
            { count: 15, coins: 80 },
            { count: 25, coins: 120 },
        ];
        const user = await this.usersRepo.findOneBy({ id: userId });
        if (!user)
            return false;
        let rewarded = false;
        for (const milestone of milestones) {
            if (totalPasted === milestone.count) {
                user.coins += milestone.coins;
                await this.usersRepo.save(user);
                rewarded = true;
                break;
            }
        }
        return rewarded;
    }
    async syncAllUsersStickerNumbers() {
        const users = await this.usersRepo.find();
        for (const user of users) {
            const pastedCount = await this.userStickerRepo.count({
                where: { user: { id: user.id }, pasted: true },
            });
            user.stickers_number = pastedCount;
            await this.usersRepo.save(user);
        }
        return {
            message: 'Contagem de figurinhas coladas atualizada com sucesso.',
        };
    }
    async remove(id) {
        const sticker = await this.findOne(id);
        await this.userStickerRepo.remove(sticker);
        return { message: 'UserSticker removido com sucesso' };
    }
    async addStickerToUser(userId, stickerId, sponsor = 'DEFAULT') {
        const user = await this.usersRepo.findOneBy({ id: userId });
        const sticker = await this.stickerRepo.findOneBy({ id: stickerId });
        if (!user || !sticker) {
            throw new common_1.NotFoundException('Usuário ou adesivo não encontrado');
        }
        const existing = await this.userStickerRepo.findOne({
            where: { user: { id: userId }, sticker: { id: stickerId }, sponsor },
        });
        if (existing) {
            existing.quantity += 1;
            return this.userStickerRepo.save(existing);
        }
        const newUserSticker = this.userStickerRepo.create({
            user,
            sticker,
            sponsor,
            quantity: 1,
            pasted: false,
        });
        return this.userStickerRepo.save(newUserSticker);
    }
    async pasteStickerByUserStickerId(userStickerId) {
        const userSticker = await this.userStickerRepo.findOne({
            where: { id: userStickerId },
            relations: ['user'],
        });
        if (!userSticker)
            throw new common_1.NotFoundException('UserSticker não encontrado');
        if (userSticker.pasted)
            throw new common_1.BadRequestException('Essa figurinha já foi colada');
        userSticker.pasted = true;
        await this.userStickerRepo.save(userSticker);
        const user = userSticker.user;
        user.level += 1;
        await this.usersRepo.save(user);
        const totalPasted = await this.userStickerRepo.count({
            where: { user: { id: user.id }, pasted: true },
        });
        user.stickers_number += totalPasted;
        await this.checkAndReward(user.id, totalPasted);
        await this.usersRepo.save(user);
        if (totalPasted === 163) {
            const existingAlbum = await this.albumRepo.findOne({
                where: { user: { id: user.id } },
            });
            if (!existingAlbum) {
                const newAlbum = this.albumRepo.create({
                    user,
                    completed: true,
                    completed_at: new Date(),
                });
                await this.albumRepo.save(newAlbum);
            }
        }
        return userSticker;
    }
    async removeSticker(userId, stickerId, sponsor = 'DEFAULT') {
        const userSticker = await this.userStickerRepo.findOne({
            where: { user: { id: userId }, sticker: { id: stickerId }, sponsor },
        });
        if (!userSticker)
            throw new common_1.NotFoundException('Adesivo não encontrado para o usuário');
        await this.userStickerRepo.remove(userSticker);
        return { message: 'Adesivo removido' };
    }
    async getAlbumProgress(userId) {
        const totalAlbumStickers = 160;
        const [pastedCount] = await this.userStickerRepo
            .createQueryBuilder('userSticker')
            .leftJoin('userSticker.user', 'user')
            .where('user.id = :userId', { userId })
            .andWhere('userSticker.pasted = true')
            .select('COUNT(DISTINCT userSticker.sticker)', 'count')
            .getRawMany();
        const pasted = parseInt(pastedCount?.count || '0', 10);
        const missing = totalAlbumStickers - pasted;
        return {
            total: totalAlbumStickers,
            pasted,
            missing,
            completed: pasted === totalAlbumStickers,
        };
    }
    async getUserStickersByPasted(userId) {
        const userStickers = await this.userStickerRepo.find({
            where: { user: { id: userId } },
            relations: ['sticker'],
        });
        const pasted = userStickers
            .filter((us) => us.pasted)
            .map((us) => us.sticker);
        const notPasted = userStickers
            .filter((us) => !us.pasted)
            .map((us) => us.sticker);
        return {
            pasted,
            notPasted,
        };
    }
};
exports.UserStickersService = UserStickersService;
exports.UserStickersService = UserStickersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_sticker_entity_1.UserSticker)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __param(2, (0, typeorm_1.InjectRepository)(album_entity_1.Album)),
    __param(3, (0, typeorm_1.InjectRepository)(sticker_entity_1.Sticker)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserStickersService);
//# sourceMappingURL=user-stickers.service.js.map