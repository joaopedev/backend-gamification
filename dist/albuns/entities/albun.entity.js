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
exports.Album = void 0;
const user_sticker_entity_1 = require("../../user-stickers/entities/user-sticker.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let Album = class Album {
    id;
    title;
    description;
    total_stickers;
    image_url;
    stickers;
    users;
};
exports.Album = Album;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Album.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Album.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Album.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 160 }),
    __metadata("design:type", Number)
], Album.prototype, "total_stickers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300, nullable: true }),
    __metadata("design:type", String)
], Album.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_sticker_entity_1.UserSticker, (stickers) => stickers.albums),
    __metadata("design:type", Array)
], Album.prototype, "stickers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.Users, (user) => user.albums),
    __metadata("design:type", Array)
], Album.prototype, "users", void 0);
exports.Album = Album = __decorate([
    (0, typeorm_1.Entity)('albums')
], Album);
//# sourceMappingURL=albun.entity.js.map