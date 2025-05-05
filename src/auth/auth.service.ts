import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { MoreThan, Repository } from 'typeorm';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { randomBytes } from 'crypto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CustomMailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
    private readonly jwtService: JwtService,
    private readonly mailService: CustomMailService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { username: data.email },
    });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    await this.userRepo.update(user.id, { last_login: new Date() });

    const token = this.jwtService.sign({ sub: user.id });
    return { user, token };
  }

  async requestPasswordReset(data: RequestPasswordResetDto) {
    const user = await this.userRepo.findOne({ where: { email: data.email } });
    if (!user) {
      throw new NotFoundException('Email não encontrado');
    }

    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hora

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    await this.userRepo.save(user);

    
    this.mailService.sendResetPasswordEmail(user.email, token);

    return { message: 'Token de recuperação enviado para o email' };
  }

  async resetPassword(data: ResetPasswordDto) {
    const user = await this.userRepo.findOne({
      where: {
        resetPasswordToken: data.token,
        resetPasswordExpires: MoreThan(new Date()),
      },
    });

    if (!user) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    const token = Math.floor(10000000 + Math.random() * 90000000).toString();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
    user.password = hashedPassword;
    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    await this.mailService.sendResetPasswordEmail(user.email, token);

    return { message: 'Código de recuperação enviado para o email' };
  }
}
