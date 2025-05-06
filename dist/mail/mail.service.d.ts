import { MailerService } from '@nestjs-modules/mailer';
export declare class CustomMailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendWelcomeEmail(email: string, username: string): Promise<void>;
    sendResetPasswordEmail(email: string, token: string): Promise<void>;
}
