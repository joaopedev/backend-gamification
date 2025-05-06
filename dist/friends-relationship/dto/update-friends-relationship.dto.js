"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFriendsRelationshipDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_friends_relationship_dto_1 = require("./create-friends-relationship.dto");
class UpdateFriendsRelationshipDto extends (0, mapped_types_1.PartialType)(create_friends_relationship_dto_1.CreateFriendsRelationshipDto) {
}
exports.UpdateFriendsRelationshipDto = UpdateFriendsRelationshipDto;
//# sourceMappingURL=update-friends-relationship.dto.js.map