import { Module } from '@nestjs/common';
import { UserStickersService } from './user-stickers.service';
import { UserStickersController } from './user-stickers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Sticker } from 'src/stickers/entities/sticker.entity';
import { UserSticker } from './entities/user-sticker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Sticker, UserSticker])],
  controllers: [UserStickersController],
  providers: [UserStickersService],
})
export class UserStickersModule {}
