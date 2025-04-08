import { Module } from '@nestjs/common';
import { StickersService } from './stickers.service';
import { StickersController } from './stickers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Sticker } from './entities/sticker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sticker,  User])],
  controllers: [StickersController],
  providers: [StickersService],
})
export class StickersModule {}
