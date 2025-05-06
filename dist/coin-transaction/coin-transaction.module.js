"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinTransactionModule = void 0;
const common_1 = require("@nestjs/common");
const coin_transaction_service_1 = require("./coin-transaction.service");
const coin_transaction_controller_1 = require("./coin-transaction.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const coin_transaction_entity_1 = require("./entities/coin-transaction.entity");
let CoinTransactionModule = class CoinTransactionModule {
};
exports.CoinTransactionModule = CoinTransactionModule;
exports.CoinTransactionModule = CoinTransactionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.Users, coin_transaction_entity_1.CoinTransaction])],
        controllers: [coin_transaction_controller_1.CoinTransactionController],
        providers: [coin_transaction_service_1.CoinTransactionService],
    })
], CoinTransactionModule);
//# sourceMappingURL=coin-transaction.module.js.map