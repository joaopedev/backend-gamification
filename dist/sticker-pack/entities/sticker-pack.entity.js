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
exports.StickerPack = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const sticker_entity_1 = require("../../stickers/entities/sticker.entity");
let StickerPack = class StickerPack {
    id;
    title;
    user;
    stickers;
};
exports.StickerPack = StickerPack;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StickerPack.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], StickerPack.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, (user) => user.stickerPacks),
    __metadata("design:type", user_entity_1.Users)
], StickerPack.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sticker_entity_1.Sticker, (sticker) => sticker.stickerPack, { cascade: true }),
    __metadata("design:type", Array)
], StickerPack.prototype, "stickers", void 0);
exports.StickerPack = StickerPack = __decorate([
    (0, typeorm_1.Entity)('sticker_packs')
], StickerPack);
//# sourceMappingURL=sticker-pack.entity.js.map