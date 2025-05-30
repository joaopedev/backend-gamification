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
const user_sticker_entity_1 = require("../user-stickers/entities/user-sticker.entity");
let TradesService = class TradesService {
    tradeRepository;
    usersRepository;
    stickerRepository;
    dataSource;
    constructor(tradeRepository, usersRepository, stickerRepository, dataSource) {
        this.tradeRepository = tradeRepository;
        this.usersRepository = usersRepository;
        this.stickerRepository = stickerRepository;
        this.dataSource = dataSource;
    }
    async create(createTradeDto) {
        const requester = await this.usersRepository.findOne({
            where: { id: createTradeDto.requesterId },
        });
        const receiver = await this.usersRepository.findOne({
            where: { id: createTradeDto.receiverId },
        });
        if (!requester)
            throw new Error('Requester not found');
        if (!receiver)
            throw new Error('Receiver not found');
        const offeredUserSticker = await this.stickerRepository.findOne({
            where: {
                user: { id: createTradeDto.requesterId },
                sticker: { id: createTradeDto.offeredStickerId },
            },
        });
        if (!offeredUserSticker || offeredUserSticker.quantity < 1) {
            throw new Error('Requester does not have the offered sticker');
        }
        const requestedUserSticker = await this.stickerRepository.findOne({
            where: {
                user: { id: createTradeDto.receiverId },
                sticker: { id: createTradeDto.requestedStickerId },
            },
        });
        if (!requestedUserSticker || requestedUserSticker.quantity < 1) {
            throw new Error('Receiver does not have the requested sticker');
        }
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
            requester: requester,
            receiver: receiver,
            offeredSticker: { id: createTradeDto.offeredStickerId },
            requestedSticker: { id: createTradeDto.requestedStickerId },
            status: createTradeDto.status ?? tradeEnum_1.TradeStatus.PENDING,
        });
        return await this.tradeRepository.save(trade);
    }
    async findAll() {
        return await this.tradeRepository.find({
            relations: [
                'requester',
                'receiver',
                'offeredSticker',
                'requestedSticker',
            ],
        });
    }
    async findOne(id) {
        const trade = await this.tradeRepository.findOne({
            where: { id },
            relations: [
                'requester',
                'receiver',
                'offeredSticker',
                'requestedSticker',
            ],
        });
        if (!trade) {
            throw new Error('Trade not found');
        }
        return trade;
    }
    async findAllTradesByUserId(userId) {
        return await this.tradeRepository.find({
            where: { requester: { id: userId } },
            relations: [
                'requester',
                'receiver',
                'offeredSticker',
                'requestedSticker',
            ],
        });
    }
    async findAllReceivedTradesByUserId(userId) {
        return await this.tradeRepository.find({
            where: { receiver: { id: userId } },
            relations: [
                'requester',
                'receiver',
                'offeredSticker',
                'requestedSticker',
            ],
        });
    }
    async findTradeHistoryByUserId(userId) {
        return await this.tradeRepository.find({
            where: [{ requester: { id: userId } }, { receiver: { id: userId } }],
            relations: [
                'requester',
                'receiver',
                'offeredSticker',
                'requestedSticker',
            ],
        });
    }
    async update(id, updateTradeDto) {
        return await this.dataSource.transaction(async (manager) => {
            const trade = await manager.findOne(trade_entity_1.Trade, {
                where: { id },
                relations: [
                    'offeredSticker',
                    'requestedSticker',
                    'requester',
                    'receiver',
                ],
            });
            if (!trade) {
                throw new Error('Trade not found');
            }
            await manager.update(trade_entity_1.Trade, id, updateTradeDto);
            const updatedTrade = await manager.findOne(trade_entity_1.Trade, {
                where: { id },
                relations: [
                    'offeredSticker',
                    'requestedSticker',
                    'requester',
                    'receiver',
                ],
            });
            if (!updatedTrade) {
                throw new Error('Trade not found after update');
            }
            if (updateTradeDto.status === tradeEnum_1.TradeStatus.ACCEPTED) {
                const offeredUserSticker = await manager.findOne(user_sticker_entity_1.UserSticker, {
                    where: {
                        user: { id: updatedTrade.requester.id },
                        sticker: { id: updatedTrade.offeredSticker.id },
                    },
                });
                const requestedUserSticker = await manager.findOne(user_sticker_entity_1.UserSticker, {
                    where: {
                        user: { id: updatedTrade.receiver.id },
                        sticker: { id: updatedTrade.requestedSticker.id },
                    },
                });
                if (!offeredUserSticker) {
                    throw new Error('Requester does not own the offered sticker');
                }
                if (!requestedUserSticker) {
                    throw new Error('Receiver does not own the requested sticker');
                }
                const tempUser = offeredUserSticker.user;
                offeredUserSticker.user = requestedUserSticker.user;
                requestedUserSticker.user = tempUser;
                await manager.save(user_sticker_entity_1.UserSticker, offeredUserSticker);
                await manager.save(user_sticker_entity_1.UserSticker, requestedUserSticker);
            }
            return updatedTrade;
        });
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
    __param(2, (0, typeorm_1.InjectRepository)(user_sticker_entity_1.UserSticker)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], TradesService);
//# sourceMappingURL=trades.service.js.map