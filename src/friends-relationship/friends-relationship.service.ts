import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendsRelationship } from './entities/friends-relationship.entity';

@Injectable()
export class FriendsRelationshipService {
  constructor(
    @InjectRepository(FriendsRelationship)
    private readonly friendsRepo: Repository<FriendsRelationship>,
  ) {}

  async sendRequest(userId: number, friendId: number) {
    if (userId === friendId) {
      throw new BadRequestException("You can't send a friend request to yourself.");
    }

    const existing = await this.friendsRepo.findOne({
      where: [
        { user_id: userId, friend_id: friendId },
        { user_id: friendId, friend_id: userId },
      ],
    });

    if (existing) {
      throw new BadRequestException('Friendship already exists or pending.');
    }

    const relationship = this.friendsRepo.create({ user_id: userId, friend_id: friendId });
    return this.friendsRepo.save(relationship);
  }

  async acceptRequest(userId: number, requesterId: number) {
    const relationship = await this.friendsRepo.findOne({
      where: { user_id: requesterId, friend_id: userId },
    });

    if (!relationship) {
      throw new NotFoundException('Friend request not found.');
    }

    relationship.is_accepted = true;
    return this.friendsRepo.save(relationship);
  }

  async blockUser(userId: number, targetId: number) {
    const relationship = await this.friendsRepo.findOne({
      where: [
        { user_id: userId, friend_id: targetId },
        { user_id: targetId, friend_id: userId },
      ],
    });

    if (!relationship) {
      // Cria o relacionamento se ainda não existir
      const newRel = this.friendsRepo.create({
        user_id: userId,
        friend_id: targetId,
        is_blocked: true,
      });
      return this.friendsRepo.save(newRel);
    }

    relationship.is_blocked = true;
    return this.friendsRepo.save(relationship);
  }

  async getFriends(userId: number) {
    const sent = await this.friendsRepo.find({
      where: { user_id: userId, is_accepted: true, is_blocked: false },
    });

    const received = await this.friendsRepo.find({
      where: { friend_id: userId, is_accepted: true, is_blocked: false },
    });

    const friendIds = [
      ...sent.map((rel) => rel.friend_id),
      ...received.map((rel) => rel.user_id),
    ];

    return friendIds; // Pode buscar os usuários depois com esses IDs
  }

  async getPendingRequests(userId: number) {
    return this.friendsRepo.find({
      where: { friend_id: userId, is_accepted: false, is_blocked: false },
    });
  }

  async removeRelationship(userId: number, targetId: number) {
    const relationship = await this.friendsRepo.findOne({
      where: [
        { user_id: userId, friend_id: targetId },
        { user_id: targetId, friend_id: userId },
      ],
    });

    if (!relationship) {
      throw new NotFoundException('Friend relationship not found.');
    }

    return this.friendsRepo.remove(relationship);
  }
}
