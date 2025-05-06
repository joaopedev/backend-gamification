"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserStickerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_sticker_dto_1 = require("./create-user-sticker.dto");
class UpdateUserStickerDto extends (0, mapped_types_1.PartialType)(create_user_sticker_dto_1.CreateUserStickerDTO) {
}
exports.UpdateUserStickerDto = UpdateUserStickerDto;
//# sourceMappingURL=update-user-sticker.dto.js.map