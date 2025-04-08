import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendsRelationshipService } from './friends-relationship.service';
import { CreateFriendsRelationshipDto } from './dto/create-friends-relationship.dto';
import { UpdateFriendsRelationshipDto } from './dto/update-friends-relationship.dto';

@Controller('friends-relationship')
export class FriendsRelationshipController {
  constructor(private readonly friendsRelationshipService: FriendsRelationshipService) {}

  @Post()
  create(@Body() createFriendsRelationshipDto: CreateFriendsRelationshipDto) {
    return this.friendsRelationshipService.create(createFriendsRelationshipDto);
  }

  @Get()
  findAll() {
    return this.friendsRelationshipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendsRelationshipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFriendsRelationshipDto: UpdateFriendsRelationshipDto) {
    return this.friendsRelationshipService.update(+id, updateFriendsRelationshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendsRelationshipService.remove(+id);
  }
}
