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
exports.Users = void 0;
const coin_transaction_entity_1 = require("../../coin-transaction/entities/coin-transaction.entity");
const sticker_pack_entity_1 = require("../../sticker-pack/entities/sticker-pack.entity");
const trade_entity_1 = require("../../trades/entities/trade.entity");
const user_sticker_entity_1 = require("../../user-stickers/entities/user-sticker.entity");
const typeorm_1 = require("typeorm");
let Users = class Users {
    id;
    name;
    username;
    password;
    confirm_password;
    email;
    image_url;
    updated_at;
    created_at;
    deleted_at;
    stickers_number;
    coins;
    conquests;
    transactions;
    initiatedTrades;
    receivedTrades;
    last_login;
    level;
    friends;
    stickerPacks;
    userStickers;
    resetPasswordToken;
    resetPasswordExpires;
    albums;
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "confirm_password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Users.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Users.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Users.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Users.prototype, "stickers_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 50 }),
    __metadata("design:type", Number)
], Users.prototype, "coins", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Users.prototype, "conquests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => coin_transaction_entity_1.CoinTransaction, (transaction) => transaction.user),
    __metadata("design:type", Array)
], Users.prototype, "transactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trade_entity_1.Trade, (trade) => trade.requester),
    __metadata("design:type", Array)
], Users.prototype, "initiatedTrades", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trade_entity_1.Trade, (trade) => trade.receiver),
    __metadata("design:type", Array)
], Users.prototype, "receivedTrades", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Users.prototype, "last_login", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Users.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Users, (user) => user.friends),
    __metadata("design:type", Array)
], Users.prototype, "friends", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sticker_pack_entity_1.StickerPack, (pack) => pack.user),
    __metadata("design:type", Array)
], Users.prototype, "stickerPacks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_sticker_entity_1.UserSticker, (us) => us.user),
    __metadata("design:type", Array)
], Users.prototype, "userStickers", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "resetPasswordToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Date)
], Users.prototype, "resetPasswordExpires", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_sticker_entity_1.UserSticker, (us) => us.user),
    __metadata("design:type", Array)
], Users.prototype, "albums", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)('users')
], Users);
//# sourceMappingURL=user.entity.js.map