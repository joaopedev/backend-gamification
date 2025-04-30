import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { CustomMailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, CustomMailService]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET || 'super',
        signOptions: { expiresIn: '7d' },
      }),
    }),
    MailModule
   ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
