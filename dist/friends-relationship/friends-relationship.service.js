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
exports.FriendsRelationshipService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const friends_relationship_entity_1 = require("./entities/friends-relationship.entity");
let FriendsRelationshipService = class FriendsRelationshipService {
    friendsRepo;
    constructor(friendsRepo) {
        this.friendsRepo = friendsRepo;
    }
    async sendRequest(userId, friendId) {
        if (userId === friendId) {
            throw new common_1.BadRequestException("You can't send a friend request to yourself.");
        }
        const existing = await this.friendsRepo.findOne({
            where: [
                { user_id: userId, friend_id: friendId },
                { user_id: friendId, friend_id: userId },
            ],
        });
        if (existing) {
            throw new common_1.BadRequestException('Friendship already exists or pending.');
        }
        const relationship = this.friendsRepo.create({ user_id: userId, friend_id: friendId });
        return this.friendsRepo.save(relationship);
    }
    async acceptRequest(userId, requesterId) {
        const relationship = await this.friendsRepo.findOne({
            where: { user_id: requesterId, friend_id: userId },
        });
        if (!relationship) {
            throw new common_1.NotFoundException('Friend request not found.');
        }
        relationship.is_accepted = true;
        return this.friendsRepo.save(relationship);
    }
    async blockUser(userId, targetId) {
        const relationship = await this.friendsRepo.findOne({
            where: [
                { user_id: userId, friend_id: targetId },
                { user_id: targetId, friend_id: userId },
            ],
        });
        if (!relationship) {
            const newRel = this.friendsRepo.create({
                user_id: userId,
                friend_id: targetId,
                is_blocked: true,
            });
            return this.friendsRepo.save(newRel);
        }
        relationship.is_blocked = true;
        return this.friendsRepo.save(relationship);
    }
    async getFriends(userId) {
        const sent = await this.friendsRepo.find({
            where: { user_id: userId, is_accepted: true, is_blocked: false },
        });
        const received = await this.friendsRepo.find({
            where: { friend_id: userId, is_accepted: true, is_blocked: false },
        });
        const friendIds = [
            ...sent.map((rel) => rel.friend_id),
            ...received.map((rel) => rel.user_id),
        ];
        return friendIds;
    }
    async getPendingRequests(userId) {
        return this.friendsRepo.find({
            where: { friend_id: userId, is_accepted: false, is_blocked: false },
        });
    }
    async removeRelationship(userId, targetId) {
        const relationship = await this.friendsRepo.findOne({
            where: [
                { user_id: userId, friend_id: targetId },
                { user_id: targetId, friend_id: userId },
            ],
        });
        if (!relationship) {
            throw new common_1.NotFoundException('Friend relationship not found.');
        }
        return this.friendsRepo.remove(relationship);
    }
};
exports.FriendsRelationshipService = FriendsRelationshipService;
exports.FriendsRelationshipService = FriendsRelationshipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(friends_relationship_entity_1.FriendsRelationship)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FriendsRelationshipService);
//# sourceMappingURL=friends-relationship.service.js.map