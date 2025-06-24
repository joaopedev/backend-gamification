import { Module } from '@nestjs/common';
import { CustomMailService } from './mail.service';
import { Users } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailController } from './mail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [CustomMailService],
  exports: [CustomMailService],
  controllers: [MailController],
})
export class MailModule {}
