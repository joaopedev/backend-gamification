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
exports.CustomMailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let CustomMailService = class CustomMailService {
    mailerService;
    userRepository;
    constructor(mailerService, userRepository) {
        this.mailerService = mailerService;
        this.userRepository = userRepository;
    }
    async sendWelcomeEmail(email, username) {
        const year = new Date().getFullYear();
        await this.mailerService.sendMail({
            to: email,
            subject: 'Bem-vindo ao Converge Que Cola!',
            template: './welcome',
            context: {
                username,
                year,
            },
        });
    }
    async sendUpdateEmailToAllUsers(description) {
        const users = await this.userRepository.find();
        const year = new Date().getFullYear();
        for (const user of users) {
            await this.mailerService.sendMail({
                to: user.email,
                subject: 'Novidades no Converge Que Cola!',
                template: './update-info',
                context: {
                    description,
                    year,
                },
            });
        }
    }
    async sendResetPasswordEmail(email, token, name) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('Usuário não encontrado para envio de e-mail');
        }
        const year = new Date().getFullYear();
        await this.mailerService.sendMail({
            to: email,
            subject: 'Recuperação de senha',
            template: './reset-password',
            context: {
                name: user.username,
                token,
                year,
            },
        });
    }
};
exports.CustomMailService = CustomMailService;
exports.CustomMailService = CustomMailService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        typeorm_1.Repository])
], CustomMailService);
//# sourceMappingURL=mail.service.js.map