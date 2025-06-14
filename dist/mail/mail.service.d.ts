import { MailerService } from '@nestjs-modules/mailer';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class CustomMailService {
    private readonly mailerService;
    private readonly userRepository;
    constructor(mailerService: MailerService, userRepository: Repository<Users>);
    sendWelcomeEmail(email: string, username: string): Promise<void>;
    sendResetPasswordEmail(email: string, token: string, name: string): Promise<void>;
}
