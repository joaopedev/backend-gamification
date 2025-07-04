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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt_1 = require("../utils/bcrypt");
const mail_service_1 = require("../mail/mail.service");
let UsersService = class UsersService {
    userRepository;
    mailService;
    constructor(userRepository, mailService) {
        this.userRepository = userRepository;
        this.mailService = mailService;
    }
    async create(createUserDto) {
        const { username, email, password } = createUserDto;
        const existingUser = await this.userRepository.findOne({
            where: { username },
        });
        if (existingUser) {
            throw new common_1.ConflictException('O nome de usuário já existe');
        }
        const existingEmail = await this.userRepository.findOne({
            where: { email },
        });
        if (existingEmail) {
            throw new common_1.ConflictException('O e-mail já existe');
        }
        const hashedPassword = (0, bcrypt_1.encodePassword)(password);
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        await this.userRepository.save(user);
        await this.mailService.sendWelcomeEmail(user.email, user.username);
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async findAll() {
        const users = await this.userRepository.find({
            relations: ['albumcompleted'],
        });
        return users.map(({ password, albumcompleted, ...rest }) => ({
            ...rest,
            album: albumcompleted || null,
        }));
    }
    async findAllEmails() {
        const users = await this.userRepository.find({
            where: { email: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) },
            select: ['email'],
        });
        return users.map((user) => user.email);
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.BadRequestException('Usuário não encontrado');
        const { password, confirm_password, ...userWithoutPassword } = user;
        return { ...userWithoutPassword, album: user.albumcompleted || null };
    }
    async update(id, updateUserDto) {
        const userToUpdate = { ...updateUserDto };
        if (userToUpdate.password && userToUpdate.confirm_password) {
            userToUpdate.password = (0, bcrypt_1.encodePassword)(userToUpdate.password);
            userToUpdate.confirm_password = (0, bcrypt_1.encodePassword)(userToUpdate.confirm_password);
        }
        await this.userRepository.update(id, userToUpdate);
        return this.findOne(id);
    }
    async remove(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        console.log('User found:', id, user);
        if (!user)
            throw new common_1.BadRequestException('Usuário não encontrado');
        try {
            await this.userRepository.remove(user);
            return { message: 'Usuário removido com sucesso' };
        }
        catch (error) {
            console.error('Erro ao remover usuário:', error);
            throw new common_1.BadRequestException('Erro ao remover usuário');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mail_service_1.CustomMailService])
], UsersService);
//# sourceMappingURL=users.service.js.map