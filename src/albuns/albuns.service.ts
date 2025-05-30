import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-albun.dto';
import { UpdateAlbunDto } from './dto/update-albun.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/albun.entity';

@Injectable()
export class AlbumService {
  constructor(@InjectRepository(Album) private repo: Repository<Album>) {}

  async create(dto: CreateAlbumDto) {
    const album = this.repo.create(dto);
    return this.repo.save(album);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: number, updateAlbunDto: UpdateAlbunDto) {
    return `This action updates a #${id} albun`;
  }

  remove(id: number) {
    return `This action removes a #${id} albun`;
  }
}



  

