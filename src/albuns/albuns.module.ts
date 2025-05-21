import { Module } from '@nestjs/common';
import { AlbumService } from './albuns.service';
import { AlbunsController } from './albuns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/albun.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album])],
  controllers: [AlbunsController],
  providers: [AlbumService],
})
export class AlbunsModule {}
