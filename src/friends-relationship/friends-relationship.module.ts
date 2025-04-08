import { Module } from '@nestjs/common';
import { FriendsRelationshipService } from './friends-relationship.service';
import { FriendsRelationshipController } from './friends-relationship.controller';

@Module({
  controllers: [FriendsRelationshipController],
  providers: [FriendsRelationshipService],
})
export class FriendsRelationshipModule {}
