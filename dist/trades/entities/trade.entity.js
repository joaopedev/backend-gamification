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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trade = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const sticker_entity_1 = require("../../stickers/entities/sticker.entity");
const tradeEnum_1 = require("./tradeEnum");
let Trade = class Trade {
    id;
    requester;
    receiver;
    offeredSticker;
    requestedSticker;
    status;
    createdAt;
};
exports.Trade = Trade;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Trade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, (user) => user.initiatedTrades),
    __metadata("design:type", user_entity_1.Users)
], Trade.prototype, "requester", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, (user) => user.receivedTrades),
    __metadata("design:type", user_entity_1.Users)
], Trade.prototype, "receiver", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sticker_entity_1.Sticker),
    __metadata("design:type", sticker_entity_1.Sticker)
], Trade.prototype, "offeredSticker", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sticker_entity_1.Sticker),
    __metadata("design:type", sticker_entity_1.Sticker)
], Trade.prototype, "requestedSticker", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: tradeEnum_1.TradeStatus, default: 'PENDING' }),
    __metadata("design:type", String)
], Trade.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Trade.prototype, "createdAt", void 0);
exports.Trade = Trade = __decorate([
    (0, typeorm_1.Entity)()
], Trade);
//# sourceMappingURL=trade.entity.js.map