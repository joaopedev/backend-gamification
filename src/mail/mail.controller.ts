import { Controller, Post, Body } from '@nestjs/common';
import { CustomMailService } from './mail.service';
import { SendUpdateDto } from './dto/send-email.dto';


@Controller('mail')
export class MailController {
  constructor(private readonly mailService: CustomMailService) {}

  @Post('updates')
  async sendUpdatesToAll(@Body() { topics }: SendUpdateDto) {
    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return { message: 'Nenhum tópico informado.' };
    }

    const formattedDescription = topics.map((topic, i) => `• ${topic}`).join('<br/>');
    await this.mailService.sendUpdateEmailToAllUsers(formattedDescription);
    
    return { message: 'Atualizações enviadas com sucesso para todos os usuários.' };
  }
}
