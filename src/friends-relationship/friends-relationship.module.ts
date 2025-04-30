import { Module } from '@nestjs/common';
import { FriendsRelationshipService } from './friends-relationship.service';
import { FriendsRelationshipController } from './friends-relationship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsRelationship } from './entities/friends-relationship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendsRelationship])],
  controllers: [FriendsRelationshipController],
  providers: [FriendsRelationshipService],
})
export class FriendsRelationshipModule {}
