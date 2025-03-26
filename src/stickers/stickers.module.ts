import { Module } from '@nestjs/common';
import { StickersService } from './stickers.service';
import { StickersController } from './stickers.controller';

@Module({
  controllers: [StickersController],
  providers: [StickersService],
})
export class StickersModule {}
