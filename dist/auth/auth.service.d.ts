import { Users } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CustomMailService } from 'src/mail/mail.service';
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    private readonly mailService;
    constructor(userRepo: Repository<Users>, jwtService: JwtService, mailService: CustomMailService);
    login(data: LoginDto): Promise<{
        user: Users;
        token: string;
    }>;
    requestPasswordReset(data: RequestPasswordResetDto): Promise<{
        message: string;
    }>;
    resetPassword(data: ResetPasswordDto): Promise<{
        message: string;
    }>;
    validateToken(token: string): Promise<{
        message: string;
        userId: number;
    }>;
}
