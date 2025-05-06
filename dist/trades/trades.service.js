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
let TradesService = class TradesService {
    tradeRepository;
    constructor(tradeRepository) {
        this.tradeRepository = tradeRepository;
    }
    async create(createTradeDto) {
        const trade = this.tradeRepository.create({
            ...createTradeDto,
            status: createTradeDto.status,
        });
        try {
            const existingTrade = await this.tradeRepository.findOne({ where: { id: createTradeDto.receiverId } });
            if (existingTrade) {
                throw new Error('Trade already exists');
            }
            const existingSticker = await this.tradeRepository.findOne({ where: { id: createTradeDto.offeredStickerId } });
            if (existingSticker) {
                throw new Error('Sticker already exists');
            }
            const existingSticker2 = await this.tradeRepository.findOne({ where: { id: createTradeDto.requestedStickerId } });
            if (existingSticker2) {
                throw new Error('Sticker already exists');
            }
            const existingUser = await this.tradeRepository.findOne({ where: { id: createTradeDto.requesterId } });
            if (existingUser) {
                throw new Error('User already exists');
            }
            const existingUser2 = await this.tradeRepository.findOne({ where: { id: createTradeDto.receiverId } });
            if (existingUser2) {
                throw new Error('User already exists');
            }
            const trade = this.tradeRepository.create(createTradeDto);
            await this.tradeRepository.save(trade);
        }
        catch (error) {
            return 'This action adds a new trade';
        }
    }
    async findAll() {
        const trades = await this.tradeRepository.find();
        return trades.map(trade => {
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
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TradesService);
//# sourceMappingURL=trades.service.js.map