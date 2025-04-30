import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class CustomMailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(email: string, username: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      sender: email,
      subject: 'Bem-vindo ao nosso serviço!',
      template: './welcome', // caminho do template
      context: {
        username,
      },
      // ou sem template:
      // text: `Olá ${username}, bem-vindo ao nosso serviço!`,
      html: `<p>Olá ${username}, bem-vindo ao nosso serviço!</p>`,
    });
  }

  async sendResetPasswordEmail(email: string, token: string): Promise<void> {
    function generateNumericToken(length = 8): string {
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
      // ou sem template:
      // text: `Seu código de recuperação é: ${token}`,
      html: `<p>Olá! Seu código de recuperação é: <strong>${token}</strong></p>`,
    });
  }
}
