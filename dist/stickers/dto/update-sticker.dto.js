"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStickerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sticker_dto_1 = require("./create-sticker.dto");
class UpdateStickerDto extends (0, mapped_types_1.PartialType)(create_sticker_dto_1.CreateStickerDTO) {
}
exports.UpdateStickerDto = UpdateStickerDto;
//# sourceMappingURL=update-sticker.dto.js.map