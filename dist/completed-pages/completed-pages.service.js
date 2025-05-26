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
exports.CompletedPagesService = void 0;
const common_1 = require("@nestjs/common");
const completed_page_entity_1 = require("./entities/completed-page.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
let CompletedPagesService = class CompletedPagesService {
    completedPageRepo;
    usersRepo;
    constructor(completedPageRepo, usersRepo) {
        this.completedPageRepo = completedPageRepo;
        this.usersRepo = usersRepo;
    }
    async create(userId, createCompletedPageDto) {
        const { pageIndex } = createCompletedPageDto;
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        const existing = await this.completedPageRepo.findOne({
            where: {
                user: { id: userId },
                page_index: pageIndex,
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Página já foi completada');
        }
        const lastEntry = await this.completedPageRepo.findOne({
            where: { user: { id: userId } },
            order: { ticket: 'DESC' },
            select: ['ticket'],
        });
        const nextTicket = lastEntry ? Number(lastEntry.ticket) + 1 : 1;
        const totalCompleted = await this.completedPageRepo.count({
            where: { user: { id: userId } },
        });
        const rewarded = await this.checkAndReward(userId, totalCompleted + 1);
        if (rewarded) {
            user.coins += 10;
            await this.usersRepo.save(user);
        }
        const newEntry = this.completedPageRepo.create({
            user,
            page_index: pageIndex,
            ticket: String(nextTicket),
        });
        await this.completedPageRepo.save(newEntry);
        return { ticket: nextTicket };
    }
    async findAll() {
        const completedPages = await this.completedPageRepo.find({
            relations: ['user'],
        });
        return completedPages.map((completedPage) => ({
            id: completedPage.id,
            userId: completedPage.user.id,
            pageIndex: completedPage.page_index,
            ticket: completedPage.ticket,
        }));
    }
    async checkAndReward(userId, totalCompleted) {
        const milestones = [
            { count: 5, coins: 30 },
            { count: 10, coins: 60 },
            { count: 20, coins: 100 },
        ];
        const user = await this.usersRepo.findOneBy({ id: userId });
        if (!user)
            return false;
        let rewarded = false;
        for (const milestone of milestones) {
            if (totalCompleted === milestone.count) {
                user.coins += milestone.coins;
                await this.usersRepo.save(user);
                rewarded = true;
                break;
            }
        }
        return rewarded;
    }
    async findOne(id) {
        const completedPage = await this.completedPageRepo.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!completedPage) {
            throw new common_1.NotFoundException(`Página completada com ID ${id} não encontrada`);
        }
        return {
            id: completedPage.id,
            userId: completedPage.user.id,
            pageIndex: completedPage.page_index,
            ticket: completedPage.ticket,
        };
    }
    async update(id, updateCompletedPageDto) {
        const page = await this.completedPageRepo.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!page) {
            throw new common_1.NotFoundException(`Página completada com ID ${id} não encontrada`);
        }
        Object.assign(page, updateCompletedPageDto);
        await this.completedPageRepo.save(page);
        return {
            message: 'Página atualizada com sucesso',
            updated: page,
        };
    }
    async remove(id) {
        const page = await this.completedPageRepo.findOne({ where: { id } });
        if (!page) {
            throw new common_1.NotFoundException(`Página completada com ID ${id} não encontrada`);
        }
        await this.completedPageRepo.remove(page);
        return { message: 'Página removida com sucesso' };
    }
};
exports.CompletedPagesService = CompletedPagesService;
exports.CompletedPagesService = CompletedPagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(completed_page_entity_1.CompletedPage)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], CompletedPagesService);
//# sourceMappingURL=completed-pages.service.js.map