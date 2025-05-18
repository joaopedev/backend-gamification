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
exports.UserStickersController = void 0;
const common_1 = require("@nestjs/common");
const user_stickers_service_1 = require("./user-stickers.service");
const create_user_sticker_dto_1 = require("./dto/create-user-sticker.dto");
const update_user_sticker_dto_1 = require("./dto/update-user-sticker.dto");
const update_pasted_dto_1 = require("./dto/update-pasted.dto");
let UserStickersController = class UserStickersController {
    userStickersService;
    constructor(userStickersService) {
        this.userStickersService = userStickersService;
    }
    create(createUserStickerDto) {
        return this.userStickersService.create(createUserStickerDto);
    }
    findAll() {
        return this.userStickersService.findAll();
    }
    findOne(id) {
        return this.userStickersService.findOne(id);
    }
    update(id, updateUserStickerDto) {
        return this.userStickersService.update(id, updateUserStickerDto);
    }
    findByUser(userId) {
        return this.userStickersService.findByUser(userId);
    }
    updatePasted(id, body) {
        return this.userStickersService.updatePasted(id, body.pasted);
    }
    remove(id) {
        return this.userStickersService.remove(id);
    }
};
exports.UserStickersController = UserStickersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_sticker_dto_1.CreateUserStickerDTO]),
    __metadata("design:returntype", void 0)
], UserStickersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserStickersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserStickersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_sticker_dto_1.UpdateUserStickerDto]),
    __metadata("design:returntype", void 0)
], UserStickersController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserStickersController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Patch)(':id/paste'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_pasted_dto_1.UpdatePastedDto]),
    __metadata("design:returntype", void 0)
], UserStickersController.prototype, "updatePasted", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserStickersController.prototype, "remove", null);
exports.UserStickersController = UserStickersController = __decorate([
    (0, common_1.Controller)('user-stickers'),
    __metadata("design:paramtypes", [user_stickers_service_1.UserStickersService])
], UserStickersController);
//# sourceMappingURL=user-stickers.controller.js.map