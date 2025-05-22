import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { FriendsRelationshipService } from './friends-relationship.service';
import { CreateFriendsRelationshipDto } from './dto/create-friends-relationship.dto';

@Controller('friends')
export class FriendsRelationshipController {
  constructor(private readonly service: FriendsRelationshipService) {}

  // POST /friends/request
  @Post('request')
  sendRequest(@Body() dto: CreateFriendsRelationshipDto) {
    return this.service.sendRequest(dto.user_id, dto.friend_id);
  }

  // PATCH /friends/accept/:userId/:requesterId
  @Patch('accept/:userId/:requesterId')
  async acceptRequest(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('requesterId', ParseIntPipe) requesterId: number,
  ) {
    const result = await this.service.acceptRequest(userId, requesterId);
    return { coinsRewarded: result.coinsRewarded ?? false };
  }

  // PATCH /friends/rejected/:userId/:targetId
  @Patch('rejected/:userId/:targetId')
  blockUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('targetId', ParseIntPipe) targetId: number,
  ) {
    return this.service.rejectedUserFriendRequest(userId, targetId);
  }

  // GET /friends/:userId
  @Get(':userId')
  getFriends(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.getFriends(userId);
  }

  // GET /friends/pending/:userId
  @Get('sent-pending/:userId')
  getPendingRequestsSentByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.getPendingRequestsSentByUser(userId);
  }

  // DELETE /friends/:userId/:targetId
  @Delete(':userId/:targetId')
  remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('targetId', ParseIntPipe) targetId: number,
  ) {
    return this.service.removeRelationship(userId, targetId);
  }
}
