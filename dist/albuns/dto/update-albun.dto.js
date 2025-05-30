"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAlbunDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_albun_dto_1 = require("./create-albun.dto");
class UpdateAlbunDto extends (0, mapped_types_1.PartialType)(create_albun_dto_1.CreateAlbumDto) {
}
exports.UpdateAlbunDto = UpdateAlbunDto;
//# sourceMappingURL=update-albun.dto.js.map