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
exports.StickersController = void 0;
const common_1 = require("@nestjs/common");
const stickers_service_1 = require("./stickers.service");
const create_sticker_dto_1 = require("./dto/create-sticker.dto");
const update_sticker_dto_1 = require("./dto/update-sticker.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let StickersController = class StickersController {
    stickersService;
    constructor(stickersService) {
        this.stickersService = stickersService;
    }
    async create(createStickerDto, file) {
        return this.stickersService.create(createStickerDto, file);
    }
    findAll() {
        return this.stickersService.findAll();
    }
    async importExistingStickers() {
        return this.stickersService.populateFromExistingImages();
    }
    findOne(id) {
        return this.stickersService.findOne(+id);
    }
    update(id, updateStickerDto) {
        return this.stickersService.update(+id, updateStickerDto);
    }
    remove(id) {
        return this.stickersService.remove(+id);
    }
};
exports.StickersController = StickersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/stickers',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sticker_dto_1.CreateStickerDTO, Object]),
    __metadata("design:returntype", Promise)
], StickersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StickersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('import-existing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StickersController.prototype, "importExistingStickers", null);
__decorate([
    (0, common_1.Get)('findOne/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StickersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('updateOne/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sticker_dto_1.UpdateStickerDto]),
    __metadata("design:returntype", void 0)
], StickersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('deleteUser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StickersController.prototype, "remove", null);
exports.StickersController = StickersController = __decorate([
    (0, common_1.Controller)('stickers'),
    __metadata("design:paramtypes", [stickers_service_1.StickersService])
], StickersController);
//# sourceMappingURL=stickers.controller.js.map