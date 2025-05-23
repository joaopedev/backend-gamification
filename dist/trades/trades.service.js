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
exports.TradesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const trade_entity_1 = require("./entities/trade.entity");
const typeorm_2 = require("typeorm");
const tradeEnum_1 = require("./entities/tradeEnum");
const user_entity_1 = require("../users/entities/user.entity");
const sticker_entity_1 = require("../stickers/entities/sticker.entity");
let TradesService = class TradesService {
    tradeRepository;
    usersRepository;
    stickerRepository;
    constructor(tradeRepository, usersRepository, stickerRepository) {
        this.tradeRepository = tradeRepository;
        this.usersRepository = usersRepository;
        this.stickerRepository = stickerRepository;
    }
    async create(createTradeDto) {
        try {
            const existingTrade = await this.tradeRepository.findOne({
                where: {
                    requester: { id: createTradeDto.requesterId },
                    receiver: { id: createTradeDto.receiverId },
                    offeredSticker: { id: createTradeDto.offeredStickerId },
                    requestedSticker: { id: createTradeDto.requestedStickerId },
                    status: tradeEnum_1.TradeStatus.PENDING,
                },
                relations: [
                    'requester',
                    'receiver',
                    'offeredSticker',
                    'requestedSticker',
                ],
            });
            if (existingTrade) {
                throw new Error('Já existe uma troca pendente com esses dados');
            }
            const trade = this.tradeRepository.create({
                requester: { id: createTradeDto.requesterId },
                receiver: { id: createTradeDto.receiverId },
                offeredSticker: { id: createTradeDto.offeredStickerId },
                requestedSticker: { id: createTradeDto.requestedStickerId },
                status: createTradeDto.status ?? tradeEnum_1.TradeStatus.PENDING,
            });
            return await this.tradeRepository.save(trade);
        }
        catch (error) {
            throw new Error(`Erro ao criar trade: ${error.message}`);
        }
    }
    async findAll() {
        const trades = await this.tradeRepository.find();
        return trades.map((trade) => {
            return trade;
        });
    }
    async findOne(id) {
        const trade = await this.tradeRepository.findOne({ where: { id } });
        if (!trade) {
            throw new Error('Trade not found');
        }
        return `This action returns a #${id} trade`;
    }
    async findAllTradesByUserId(userId) {
        const trades = await this.tradeRepository.find({
            where: { requester: { id: userId } },
            relations: [
                'requester',
                'receiver',
                'offeredSticker',
                'requestedSticker',
            ],
        });
        return trades;
    }
    async findAllReceivedTradesByUserId(userId) {
        const trades = await this.tradeRepository.find({
            where: {
                receiver: { id: userId },
            },
            relations: [
                'requester',
                'receiver',
                'offeredSticker',
                'requestedSticker',
            ],
        });
        return trades;
    }
    async findTradeHistoryByUserId(userId) {
        const trades = await this.tradeRepository.find({
            where: [{ requester: { id: userId } }, { receiver: { id: userId } }],
            relations: [
                'requester',
                'receiver',
                'offeredSticker',
                'requestedSticker',
            ],
        });
        return trades;
    }
    async update(id, updateTradeDto) {
        const trade = await this.tradeRepository.findOne({ where: { id } });
        if (!trade) {
            throw new Error('Trade not found');
        }
        await this.tradeRepository.update(id, updateTradeDto);
        const updatedTrade = await this.tradeRepository.findOne({ where: { id } });
        if (!updatedTrade) {
            throw new Error('Trade not found after update');
        }
        return updatedTrade;
    }
    remove(id) {
        return `This action removes a #${id} trade`;
    }
};
exports.TradesService = TradesService;
exports.TradesService = TradesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(trade_entity_1.Trade)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __param(2, (0, typeorm_1.InjectRepository)(sticker_entity_1.Sticker)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TradesService);
//# sourceMappingURL=trades.service.js.map