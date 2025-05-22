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
exports.CompletedPagesController = void 0;
const common_1 = require("@nestjs/common");
const create_completed_page_dto_1 = require("./dto/create-completed-page.dto");
const update_completed_page_dto_1 = require("./dto/update-completed-page.dto");
const completed_pages_service_1 = require("./completed-pages.service");
let CompletedPagesController = class CompletedPagesController {
    completedPagesService;
    constructor(completedPagesService) {
        this.completedPagesService = completedPagesService;
    }
    async completePage(dto) {
        return this.completedPagesService.create(dto.userId, dto);
    }
    findAll() {
        return this.completedPagesService.findAll();
    }
    findOne(id) {
        return this.completedPagesService.findOne(+id);
    }
    update(id, updateCompletedPageDto) {
        return this.completedPagesService.update(+id, updateCompletedPageDto);
    }
    remove(id) {
        return this.completedPagesService.remove(+id);
    }
};
exports.CompletedPagesController = CompletedPagesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_completed_page_dto_1.CompletePageDto]),
    __metadata("design:returntype", Promise)
], CompletedPagesController.prototype, "completePage", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompletedPagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompletedPagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_completed_page_dto_1.UpdateCompletedPageDto]),
    __metadata("design:returntype", void 0)
], CompletedPagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompletedPagesController.prototype, "remove", null);
exports.CompletedPagesController = CompletedPagesController = __decorate([
    (0, common_1.Controller)('completed-pages'),
    __metadata("design:paramtypes", [completed_pages_service_1.CompletedPagesService])
], CompletedPagesController);
//# sourceMappingURL=completed-pages.controller.js.map