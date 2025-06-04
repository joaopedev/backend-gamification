import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Album } from './entities/album.entity';
import { Users } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Album])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
