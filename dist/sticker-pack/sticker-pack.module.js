"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickerPackModule = void 0;
const common_1 = require("@nestjs/common");
const sticker_pack_service_1 = require("./sticker-pack.service");
const sticker_pack_controller_1 = require("./sticker-pack.controller");
const typeorm_1 = require("@nestjs/typeorm");
const sticker_entity_1 = require("../stickers/entities/sticker.entity");
const user_entity_1 = require("../users/entities/user.entity");
const sticker_pack_entity_1 = require("./entities/sticker-pack.entity");
let StickerPackModule = class StickerPackModule {
};
exports.StickerPackModule = StickerPackModule;
exports.StickerPackModule = StickerPackModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sticker_entity_1.Sticker, user_entity_1.Users, sticker_pack_entity_1.StickerPack])],
        controllers: [sticker_pack_controller_1.StickerPackController],
        providers: [sticker_pack_service_1.StickerPackService],
        exports: [sticker_pack_service_1.StickerPackService]
    })
], StickerPackModule);
//# sourceMappingURL=sticker-pack.module.js.map