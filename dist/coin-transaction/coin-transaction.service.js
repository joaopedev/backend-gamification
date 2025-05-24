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
exports.CoinTransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const coin_transaction_entity_1 = require("./entities/coin-transaction.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
let CoinTransactionService = class CoinTransactionService {
    coinTransactionRepo;
    usersRepo;
    constructor(coinTransactionRepo, usersRepo) {
        this.coinTransactionRepo = coinTransactionRepo;
        this.usersRepo = usersRepo;
    }
    async create(createCoinTransactionDto) {
        const { userId, coins, type, qrCodeId } = createCoinTransactionDto;
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado');
        if (type === 'QR_CODE') {
            if (!qrCodeId) {
                throw new common_1.BadRequestException('QR Code ID é obrigatório para transações do tipo QR_CODE');
            }
            const existing = await this.coinTransactionRepo.findOne({
                where: { user: { id: userId }, type: 'QR_CODE', qrCodeId },
            });
            if (existing) {
                throw new common_1.BadRequestException('Este QR Code já foi utilizado por este usuário');
            }
        }
        user.coins += coins;
        await this.usersRepo.save(user);
        const transaction = this.coinTransactionRepo.create({
            user,
            coins,
            type,
            isReceived: true,
            qrCodeId: qrCodeId ?? undefined,
        });
        await this.coinTransactionRepo.save(transaction);
        return transaction;
    }
    findAll() {
        return `This action returns all coinTransaction`;
    }
    findOne(id) {
        return `This action returns a #${id} coinTransaction`;
    }
    update(id, updateCoinTransactionDto) {
        return `This action updates a #${id} coinTransaction`;
    }
    remove(id) {
        return `This action removes a #${id} coinTransaction`;
    }
};
exports.CoinTransactionService = CoinTransactionService;
exports.CoinTransactionService = CoinTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coin_transaction_entity_1.CoinTransaction)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CoinTransactionService);
//# sourceMappingURL=coin-transaction.service.js.map