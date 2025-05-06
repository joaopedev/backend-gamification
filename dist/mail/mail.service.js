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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomMailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let CustomMailService = class CustomMailService {
    mailerService;
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendWelcomeEmail(email, username) {
        await this.mailerService.sendMail({
            to: email,
            sender: email,
            subject: 'Bem-vindo ao nosso serviço!',
            template: './welcome',
            context: {
                username,
            },
            html: `<p>Olá ${username}, bem-vindo ao nosso serviço!</p>`,
        });
    }
    async sendResetPasswordEmail(email, token) {
        function generateNumericToken(length = 8) {
            const min = Math.pow(10, length - 1);
            const max = Math.pow(10, length) - 1;
            return Math.floor(Math.random() * (max - min + 1) + min).toString();
        }
        token = generateNumericToken();
        await this.mailerService.sendMail({
            to: email,
            sender: email,
            subject: 'Recuperação de senha',
            template: './reset-password',
            context: {
                token,
            },
            html: `<p>Olá! Seu código de recuperação é: <strong>${token}</strong></p>`,
        });
    }
};
exports.CustomMailService = CustomMailService;
exports.CustomMailService = CustomMailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], CustomMailService);
//# sourceMappingURL=mail.service.js.map