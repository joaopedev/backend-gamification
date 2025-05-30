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
const user_entity_1 = require("../users/entities/user.entity");
const friends_relationshipEnum_1 = require("./entities/friends-relationshipEnum");
let FriendsRelationshipService = class FriendsRelationshipService {
    friendsRepo;
    usersRepo;
    constructor(friendsRepo, usersRepo) {
        this.friendsRepo = friendsRepo;
        this.usersRepo = usersRepo;
    }
    async sendRequest(userId, friendId) {
        if (userId === friendId) {
            throw new common_1.BadRequestException('Você não pode enviar uma solicitação de amizade para si mesmo.');
        }
        const existing = await this.friendsRepo.findOne({
            where: [
                { user_id: userId, friend_id: friendId },
                { user_id: friendId, friend_id: userId },
            ],
        });
        if (existing) {
            if (existing.is_rejected) {
                throw new common_1.BadRequestException('A solicitação de amizade foi rejeitada. Não é possível reenviar.');
            }
            throw new common_1.BadRequestException('A amizade já existe ou está pendente.');
        }
        const relationship = this.friendsRepo.create({
            user_id: userId,
            friend_id: friendId,
        });
        return this.friendsRepo.save(relationship);
    }
    async acceptRequest(userId, requesterId) {
        const relationship = await this.friendsRepo.findOne({
            where: {
                user_id: requesterId,
                friend_id: userId,
            },
            relations: ['user', 'friend'],
        });
        if (!relationship) {
            throw new common_1.NotFoundException('Solicitação de amizade não encontrada.');
        }
        if (relationship.status === friends_relationshipEnum_1.FriendsRelationshipStatus.ACCEPTED) {
            throw new common_1.BadRequestException('Pedido já aceito.');
        }
        relationship.status = friends_relationshipEnum_1.FriendsRelationshipStatus.ACCEPTED;
        await this.friendsRepo.save(relationship);
        const [userFriends, requesterFriends] = await Promise.all([
            this.getFriendsCount(userId),
            this.getFriendsCount(requesterId),
        ]);
        const userRewarded = await this.checkAndReward(userId, userFriends);
        const requesterRewarded = await this.checkAndReward(requesterId, requesterFriends);
        return {
            coinsRewarded: userRewarded || requesterRewarded,
        };
    }
    async findFriendRelationsHistoryByUserId(userId) {
        const relations = await this.friendsRepo.find({
            where: [{ user_id: userId }, { friend_id: userId }],
            relations: ['user', 'friend'],
            order: { id: 'DESC' },
        });
        return relations;
    }
    async getPendingRequestsReceivedByUser(userId) {
        return this.friendsRepo.find({
            where: {
                friend_id: userId,
                is_accepted: false,
                is_rejected: false,
                status: friends_relationshipEnum_1.FriendsRelationshipStatus.PENDING,
            },
            relations: ['user'],
            order: { id: 'ASC' },
        });
    }
    async getFriendsCount(userId) {
        const [sent, received] = await Promise.all([
            this.friendsRepo.count({
                where: { user_id: userId, is_accepted: true, is_rejected: false },
            }),
            this.friendsRepo.count({
                where: { friend_id: userId, is_accepted: true, is_rejected: false },
            }),
        ]);
        return sent + received;
    }
    async checkAndReward(userId, totalFriends) {
        const milestones = [
            { count: 5, coins: 50 },
            { count: 15, coins: 80 },
            { count: 25, coins: 120 },
        ];
        const user = await this.usersRepo.findOneBy({ id: userId });
        if (!user)
            return false;
        let rewarded = false;
        for (const milestone of milestones) {
            if (totalFriends === milestone.count) {
                user.coins += milestone.coins;
                await this.usersRepo.save(user);
                rewarded = true;
                break;
            }
        }
        return rewarded;
    }
    async rejectedUserFriendRequest(userId, targetId) {
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
                is_rejected: true,
            });
            return this.friendsRepo.save(newRel);
        }
        relationship.is_rejected = true;
        relationship.status = friends_relationshipEnum_1.FriendsRelationshipStatus.REJECTED;
        return this.friendsRepo.save(relationship);
    }
    async getFriends(userId) {
        const sent = await this.friendsRepo.find({
            where: {
                user_id: userId,
                is_accepted: true,
                is_rejected: false,
            },
            relations: ['friend'],
            order: { id: 'ASC' },
        });
        const received = await this.friendsRepo.find({
            where: {
                friend_id: userId,
                is_accepted: true,
                is_rejected: false,
            },
            relations: ['user'],
            order: { id: 'ASC' },
        });
        return [...sent, ...received];
    }
    async getPendingRequests(userId) {
        return this.friendsRepo.find({
            where: {
                friend_id: userId,
                is_accepted: false,
                is_rejected: false,
                status: friends_relationshipEnum_1.FriendsRelationshipStatus.PENDING,
            },
            relations: ['friend'],
            order: { id: 'ASC' },
        });
    }
    async getPendingRequestsSentByUser(userId) {
        return this.friendsRepo.find({
            where: {
                user_id: userId,
                is_accepted: false,
                is_rejected: false,
                status: friends_relationshipEnum_1.FriendsRelationshipStatus.PENDING,
            },
            relations: ['friend'],
            order: { id: 'ASC' },
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
            throw new common_1.NotFoundException('Relação de amizade não encontrada.');
        }
        return this.friendsRepo.remove(relationship);
    }
    async getRejectedRelationships(userId) {
        return this.friendsRepo.find({
            where: [
                { user_id: userId, is_rejected: true },
                { friend_id: userId, is_rejected: true },
            ],
            relations: ['user', 'friend'],
        });
    }
};
exports.FriendsRelationshipService = FriendsRelationshipService;
exports.FriendsRelationshipService = FriendsRelationshipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(friends_relationship_entity_1.FriendsRelationship)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FriendsRelationshipService);
//# sourceMappingURL=friends-relationship.service.js.map