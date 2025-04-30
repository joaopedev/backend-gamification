import { Module } from '@nestjs/common';
import { StickersService } from './stickers.service';
import { StickersController } from './stickers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Sticker } from './entities/sticker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Sticker])],
  controllers: [StickersController],
  providers: [StickersService],
})
export class StickersModule {}
