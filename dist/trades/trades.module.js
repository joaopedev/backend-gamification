"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradesModule = void 0;
const common_1 = require("@nestjs/common");
const trades_service_1 = require("./trades.service");
const trades_controller_1 = require("./trades.controller");
const typeorm_1 = require("@nestjs/typeorm");
const trade_entity_1 = require("./entities/trade.entity");
const user_entity_1 = require("../users/entities/user.entity");
const user_sticker_entity_1 = require("../user-stickers/entities/user-sticker.entity");
const sticker_entity_1 = require("../stickers/entities/sticker.entity");
let TradesModule = class TradesModule {
};
exports.TradesModule = TradesModule;
exports.TradesModule = TradesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([trade_entity_1.Trade, user_entity_1.Users, user_sticker_entity_1.UserSticker, sticker_entity_1.Sticker])],
        controllers: [trades_controller_1.TradesController],
        providers: [trades_service_1.TradesService],
    })
], TradesModule);
//# sourceMappingURL=trades.module.js.map