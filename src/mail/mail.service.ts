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
    const year = new Date().getFullYear();

    await this.mailerService.sendMail({
      to: email,
      subject: 'Bem-vindo ao Converge Que Cola!',
      template: './welcome',
      context: {
        username,
        year,
      },
    });
  }

  async sendUpdateEmailToAllUsers(description: string): Promise<void> {
    const users = await this.userRepository.find();
    const year = new Date().getFullYear();

    for (const user of users) {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Novidades no Converge Que Cola!',
        template: './update-info',
        context: {
          description,
          year,
        },
      });
    }
  }

  async sendResetPasswordEmail(
    email: string,
    token: string,
    name: string,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Usuário não encontrado para envio de e-mail');
    }

    const year = new Date().getFullYear();

    await this.mailerService.sendMail({
      to: email,
      // sender: email, // 'sender' is usually optional and often set globally in MailerModule config
      subject: 'Recuperação de senha',
      template: './reset-password', // This will now correctly use the template file
      context: {
        name: user.username, // Pass 'user.username' as 'name' to match your template
        token,
        year,
      },
      // REMOVE THE `html` PROPERTY HERE!
    });
  }
}
