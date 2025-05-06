"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodePassword = encodePassword;
exports.comparePasswords = comparePasswords;
const bcrypt = require("bcrypt");
function encodePassword(rawPassword) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, salt);
}
function comparePasswords(rawPassword, hash) {
    return bcrypt.compareSync(rawPassword, hash);
}
//# sourceMappingURL=bcrypt.js.map