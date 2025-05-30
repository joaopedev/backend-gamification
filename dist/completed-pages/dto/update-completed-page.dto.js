"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompletedPageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_completed_page_dto_1 = require("./create-completed-page.dto");
class UpdateCompletedPageDto extends (0, mapped_types_1.PartialType)(create_completed_page_dto_1.CompletePageDto) {
}
exports.UpdateCompletedPageDto = UpdateCompletedPageDto;
//# sourceMappingURL=update-completed-page.dto.js.map