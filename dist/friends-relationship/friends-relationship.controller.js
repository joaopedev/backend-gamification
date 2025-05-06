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
exports.FriendsRelationshipController = void 0;
const common_1 = require("@nestjs/common");
const friends_relationship_service_1 = require("./friends-relationship.service");
const create_friends_relationship_dto_1 = require("./dto/create-friends-relationship.dto");
let FriendsRelationshipController = class FriendsRelationshipController {
    service;
    constructor(service) {
        this.service = service;
    }
    sendRequest(dto) {
        return this.service.sendRequest(dto.user_id, dto.friend_id);
    }
    acceptRequest(userId, requesterId) {
        return this.service.acceptRequest(userId, requesterId);
    }
    blockUser(userId, targetId) {
        return this.service.blockUser(userId, targetId);
    }
    getFriends(userId) {
        return this.service.getFriends(userId);
    }
    getPendingRequests(userId) {
        return this.service.getPendingRequests(userId);
    }
    remove(userId, targetId) {
        return this.service.removeRelationship(userId, targetId);
    }
};
exports.FriendsRelationshipController = FriendsRelationshipController;
__decorate([
    (0, common_1.Post)('request'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_friends_relationship_dto_1.CreateFriendsRelationshipDto]),
    __metadata("design:returntype", void 0)
], FriendsRelationshipController.prototype, "sendRequest", null);
__decorate([
    (0, common_1.Patch)('accept/:userId/:requesterId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('requesterId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], FriendsRelationshipController.prototype, "acceptRequest", null);
__decorate([
    (0, common_1.Patch)('block/:userId/:targetId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('targetId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], FriendsRelationshipController.prototype, "blockUser", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FriendsRelationshipController.prototype, "getFriends", null);
__decorate([
    (0, common_1.Get)('pending/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FriendsRelationshipController.prototype, "getPendingRequests", null);
__decorate([
    (0, common_1.Delete)(':userId/:targetId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('targetId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], FriendsRelationshipController.prototype, "remove", null);
exports.FriendsRelationshipController = FriendsRelationshipController = __decorate([
    (0, common_1.Controller)('friends'),
    __metadata("design:paramtypes", [friends_relationship_service_1.FriendsRelationshipService])
], FriendsRelationshipController);
//# sourceMappingURL=friends-relationship.controller.js.map