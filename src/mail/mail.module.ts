import { Module } from '@nestjs/common';
import { CustomMailService } from './mail.service';

@Module({
  providers: [CustomMailService],
  exports: [CustomMailService], // 👈 necessário para usar em outros módulos
})
export class MailModule {}