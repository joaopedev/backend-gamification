import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepo: Repository<Album>,

    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
  ) {}

  async findAll() {
    return this.albumRepo.find({ relations: ['user'] });
  }

  async findByUser(userId: number) {
    return this.albumRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}

