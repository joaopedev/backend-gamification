import { Module } from '@nestjs/common';
import { CustomMailService } from './mail.service';
import { Users } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [CustomMailService],
  exports: [CustomMailService],
})
export class MailModule {}
