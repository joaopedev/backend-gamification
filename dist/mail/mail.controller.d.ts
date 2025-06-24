import { CustomMailService } from './mail.service';
import { SendUpdateDto } from './dto/send-email.dto';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: CustomMailService);
    sendUpdatesToAll({ topics }: SendUpdateDto): Promise<{
        message: string;
    }>;
}
