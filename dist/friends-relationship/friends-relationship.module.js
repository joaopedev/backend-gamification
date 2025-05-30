"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsRelationshipModule = void 0;
const common_1 = require("@nestjs/common");
const friends_relationship_service_1 = require("./friends-relationship.service");
const friends_relationship_controller_1 = require("./friends-relationship.controller");
const typeorm_1 = require("@nestjs/typeorm");
const friends_relationship_entity_1 = require("./entities/friends-relationship.entity");
const user_entity_1 = require("../users/entities/user.entity");
let FriendsRelationshipModule = class FriendsRelationshipModule {
};
exports.FriendsRelationshipModule = FriendsRelationshipModule;
exports.FriendsRelationshipModule = FriendsRelationshipModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([friends_relationship_entity_1.FriendsRelationship, user_entity_1.Users])],
        controllers: [friends_relationship_controller_1.FriendsRelationshipController],
        providers: [friends_relationship_service_1.FriendsRelationshipService],
    })
], FriendsRelationshipModule);
//# sourceMappingURL=friends-relationship.module.js.map