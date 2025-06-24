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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailController = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const send_email_dto_1 = require("./dto/send-email.dto");
let MailController = class MailController {
    mailService;
    constructor(mailService) {
        this.mailService = mailService;
    }
    async sendUpdatesToAll({ topics }) {
        if (!topics || !Array.isArray(topics) || topics.length === 0) {
            return { message: 'Nenhum tópico informado.' };
        }
        const formattedDescription = topics.map((topic, i) => `• ${topic}`).join('<br/>');
        await this.mailService.sendUpdateEmailToAllUsers(formattedDescription);
        return { message: 'Atualizações enviadas com sucesso para todos os usuários.' };
    }
};
exports.MailController = MailController;
__decorate([
    (0, common_1.Post)('updates'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_email_dto_1.SendUpdateDto]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "sendUpdatesToAll", null);
exports.MailController = MailController = __decorate([
    (0, common_1.Controller)('mail'),
    __metadata("design:paramtypes", [mail_service_1.CustomMailService])
], MailController);
//# sourceMappingURL=mail.controller.js.map