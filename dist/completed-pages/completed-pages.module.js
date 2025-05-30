"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletedPagesModule = void 0;
const common_1 = require("@nestjs/common");
const completed_pages_service_1 = require("./completed-pages.service");
const completed_pages_controller_1 = require("./completed-pages.controller");
const completed_page_entity_1 = require("./entities/completed-page.entity");
const user_entity_1 = require("../users/entities/user.entity");
const dist_1 = require("@nestjs/typeorm/dist");
let CompletedPagesModule = class CompletedPagesModule {
};
exports.CompletedPagesModule = CompletedPagesModule;
exports.CompletedPagesModule = CompletedPagesModule = __decorate([
    (0, common_1.Module)({
        imports: [dist_1.TypeOrmModule.forFeature([completed_page_entity_1.CompletedPage, user_entity_1.Users])],
        controllers: [completed_pages_controller_1.CompletedPagesController],
        providers: [completed_pages_service_1.CompletedPagesService],
    })
], CompletedPagesModule);
//# sourceMappingURL=completed-pages.module.js.map