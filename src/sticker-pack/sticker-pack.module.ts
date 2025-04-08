import { Module } from '@nestjs/common';
import { StickerPackService } from './sticker-pack.service';
import { StickerPackController } from './sticker-pack.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sticker } from 'src/stickers/entities/sticker.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sticker, User])],
  controllers: [StickerPackController],
  providers: [StickerPackService],
  exports: [StickerPackService]
})
export class StickerPackModule {}
