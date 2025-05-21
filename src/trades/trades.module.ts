import { Module } from '@nestjs/common';
import { TradesService } from './trades.service';
import { TradesController } from './trades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from './entities/trade.entity';
import { Users } from 'src/users/entities/user.entity';
import { UserSticker } from 'src/user-stickers/entities/user-sticker.entity';
import { Sticker } from 'src/stickers/entities/sticker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trade, Users, UserSticker, Sticker])],
  controllers: [TradesController],
  providers: [TradesService],
})
export class TradesModule {}
