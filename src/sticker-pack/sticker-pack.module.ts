import { Module } from '@nestjs/common';
import { StickerPackService } from './sticker-pack.service';
import { StickerPackController } from './sticker-pack.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sticker } from 'src/stickers/entities/sticker.entity';
import { Users } from 'src/users/entities/user.entity';
import { StickerPack } from './entities/sticker-pack.entity';
import { UserSticker } from 'src/user-stickers/entities/user-sticker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sticker, Users, StickerPack, UserSticker])],
  controllers: [StickerPackController],
  providers: [StickerPackService],
  exports: [StickerPackService]
})
export class StickerPackModule {}
