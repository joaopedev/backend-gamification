"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCoinTransactionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_coin_transaction_dto_1 = require("./create-coin-transaction.dto");
class UpdateCoinTransactionDto extends (0, mapped_types_1.PartialType)(create_coin_transaction_dto_1.CreateCoinTransactionDTO) {
}
exports.UpdateCoinTransactionDto = UpdateCoinTransactionDto;
//# sourceMappingURL=update-coin-transaction.dto.js.map