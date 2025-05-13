"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStickersModule = void 0;
const common_1 = require("@nestjs/common");
const user_stickers_service_1 = require("./user-stickers.service");
const user_stickers_controller_1 = require("./user-stickers.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const sticker_entity_1 = require("../stickers/entities/sticker.entity");
const user_sticker_entity_1 = require("./entities/user-sticker.entity");
let UserStickersModule = class UserStickersModule {
};
exports.UserStickersModule = UserStickersModule;
exports.UserStickersModule = UserStickersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.Users, sticker_entity_1.Sticker, user_sticker_entity_1.UserSticker])],
        controllers: [user_stickers_controller_1.UserStickersController],
        providers: [user_stickers_service_1.UserStickersService],
    })
], UserStickersModule);
//# sourceMappingURL=user-stickers.module.js.map