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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../users/entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    userRepo;
    jwtService;
    mailService;
    constructor(userRepo, jwtService, mailService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async login(data) {
        const user = await this.userRepo.findOne({
            where: { email: data.email },
        });
        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        await this.userRepo.update(user.id, { last_login: new Date() });
        const token = this.jwtService.sign({ sub: user.id });
        return { user, token };
    }
    async requestPasswordReset(data) {
        const user = await this.userRepo.findOne({ where: { email: data.email } });
        if (!user) {
            throw new common_1.NotFoundException('Email não encontrado');
        }
        const token = Math.floor(10000000 + Math.random() * 90000000).toString();
        const expires = new Date(Date.now() + 3600000);
        user.resetPasswordToken = token;
        user.resetPasswordExpires = expires;
        await this.userRepo.save(user);
        await this.mailService.sendResetPasswordEmail(user.email, token, user.username);
        return { message: 'Token de recuperação enviado para o email' };
    }
    async resetPassword(data) {
        const user = await this.userRepo.findOne({
            where: {
                resetPasswordToken: data.token,
                resetPasswordExpires: (0, typeorm_2.MoreThan)(new Date()),
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Token inválido ou expirado');
        }
        const hashedPassword = await bcrypt.hash(data.newPassword, 10);
        const token = Math.floor(10000000 + Math.random() * 90000000).toString();
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        user.password = hashedPassword;
        user.resetPasswordToken = token;
        user.resetPasswordExpires = expires;
        await this.mailService.sendResetPasswordEmail(user.email, token, user.username);
        return { message: 'Código de recuperação enviado para o email' };
    }
    async validateToken(token) {
        const user = await this.userRepo.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: (0, typeorm_2.MoreThan)(new Date()),
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Token inválido ou expirado');
        }
        return {
            message: 'Token válido',
            userId: user.id,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        mail_service_1.CustomMailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map