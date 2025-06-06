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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsRelationship = void 0;
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const friends_relationshipEnum_1 = require("./friends-relationshipEnum");
let FriendsRelationship = class FriendsRelationship {
    id;
    user_id;
    friend_id;
    user;
    friend;
    is_accepted;
    is_rejected;
    status;
};
exports.FriendsRelationship = FriendsRelationship;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FriendsRelationship.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], FriendsRelationship.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FriendsRelationship.prototype, "friend_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.Users)
], FriendsRelationship.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users),
    (0, typeorm_1.JoinColumn)({ name: 'friend_id' }),
    __metadata("design:type", user_entity_1.Users)
], FriendsRelationship.prototype, "friend", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], FriendsRelationship.prototype, "is_accepted", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], FriendsRelationship.prototype, "is_rejected", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: friends_relationshipEnum_1.FriendsRelationshipStatus, default: 'PENDING' }),
    __metadata("design:type", String)
], FriendsRelationship.prototype, "status", void 0);
exports.FriendsRelationship = FriendsRelationship = __decorate([
    (0, typeorm_1.Entity)()
], FriendsRelationship);
//# sourceMappingURL=friends-relationship.entity.js.map