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
exports.CoinTransactionController = void 0;
const common_1 = require("@nestjs/common");
const coin_transaction_service_1 = require("./coin-transaction.service");
const create_coin_transaction_dto_1 = require("./dto/create-coin-transaction.dto");
const update_coin_transaction_dto_1 = require("./dto/update-coin-transaction.dto");
let CoinTransactionController = class CoinTransactionController {
    coinTransactionService;
    constructor(coinTransactionService) {
        this.coinTransactionService = coinTransactionService;
    }
    create(createCoinTransactionDto) {
        return this.coinTransactionService.create(createCoinTransactionDto);
    }
    findAll() {
        return this.coinTransactionService.findAll();
    }
    findOne(id) {
        return this.coinTransactionService.findOne(+id);
    }
    update(id, updateCoinTransactionDto) {
        return this.coinTransactionService.update(+id, updateCoinTransactionDto);
    }
    remove(id) {
        return this.coinTransactionService.remove(+id);
    }
};
exports.CoinTransactionController = CoinTransactionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coin_transaction_dto_1.CreateCoinTransactionDTO]),
    __metadata("design:returntype", void 0)
], CoinTransactionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoinTransactionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoinTransactionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_coin_transaction_dto_1.UpdateCoinTransactionDto]),
    __metadata("design:returntype", void 0)
], CoinTransactionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoinTransactionController.prototype, "remove", null);
exports.CoinTransactionController = CoinTransactionController = __decorate([
    (0, common_1.Controller)('coin-transaction'),
    __metadata("design:paramtypes", [coin_transaction_service_1.CoinTransactionService])
], CoinTransactionController);
//# sourceMappingURL=coin-transaction.controller.js.map