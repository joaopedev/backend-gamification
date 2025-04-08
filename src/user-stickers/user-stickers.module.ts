import { Module } from '@nestjs/common';
import { UserStickersService } from './user-stickers.service';
import { UserStickersController } from './user-stickers.controller';

@Module({
  controllers: [UserStickersController],
  providers: [UserStickersService],
})
export class UserStickersModule {}
