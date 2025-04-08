import { Injectable } from '@nestjs/common';
import { CreateFriendsRelationshipDto } from './dto/create-friends-relationship.dto';
import { UpdateFriendsRelationshipDto } from './dto/update-friends-relationship.dto';

@Injectable()
export class FriendsRelationshipService {
  create(createFriendsRelationshipDto: CreateFriendsRelationshipDto) {
    return 'This action adds a new friendsRelationship';
  }

  findAll() {
    return `This action returns all friendsRelationship`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friendsRelationship`;
  }

  update(id: number, updateFriendsRelationshipDto: UpdateFriendsRelationshipDto) {
    return `This action updates a #${id} friendsRelationship`;
  }

  remove(id: number) {
    return `This action removes a #${id} friendsRelationship`;
  }
}
