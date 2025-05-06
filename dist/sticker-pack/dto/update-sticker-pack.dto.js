"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStickerPackDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sticker_pack_dto_1 = require("./create-sticker-pack.dto");
class UpdateStickerPackDto extends (0, mapped_types_1.PartialType)(create_sticker_pack_dto_1.CreateStickerPackDTO) {
}
exports.UpdateStickerPackDto = UpdateStickerPackDto;
//# sourceMappingURL=update-sticker-pack.dto.js.map