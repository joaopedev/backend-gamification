import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomMailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

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

  async sendResetPasswordEmail(email: string, token: string, name: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Usuário não encontrado para envio de e-mail');
    }

    const year = new Date().getFullYear();

    await this.mailerService.sendMail({
      to: email,
      sender: email,
      subject: 'Recuperação de senha',
      template: './reset-password',
      context: {
        name: user.username,
        token,
        year,
      },
      html: `

  <head>
    <meta charset="UTF-8" />
    <title>Recuperação de Senha</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f2f2f2; font-family: Arial, sans-serif">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f2f2f2; padding: 20px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: #ffffff; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
            <tr>
              <td align="center" style="background-color: #45a9b0; padding: 20px;">
                <img src="https://i.ibb.co/ZT8mr79/logo.png" alt="Converge Que Cola" width="200" style="display: block;" />
              </td>
            </tr>
            <tr>
              <td style="padding: 30px 20px; text-align: center;">
                <h2 style="color: #45a9b0; margin-bottom: 10px;">Olá, {{ name }}!</h2>
                <p style="color: #444; font-size: 16px; margin-bottom: 10px;">
                  Recebemos uma solicitação para redefinir sua senha.
                </p>
                <p style="color: #444; font-size: 16px; margin-bottom: 20px;">
                  Para isso, insira este <strong>código de acesso</strong> no seu aplicativo:
                </p>
                <p style="font-size: 36px; font-weight: bold; color: #d1349b; margin: 0 0 20px 0;">
                  {{ token }}
                </p>
                <p style="color: #444; font-size: 14px; font-weight: bold; margin-bottom: 10px;">
                  Este código expira em 24 horas.
                </p>
                <p style="color: #777; font-size: 14px; margin: 0;">
                  Caso seja necessário, solicite um novo código de acesso.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; text-align: center; color: #999; font-size: 12px;">
                © {{ year }} Converge Que Cola. Todos os direitos reservados.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
`,
    });
  }
}
