import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StickerPack } from 'src/sticker-pack/entities/sticker-pack.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users, StickerPack]), MailModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
