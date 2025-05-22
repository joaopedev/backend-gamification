import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendsRelationship } from './entities/friends-relationship.entity';
import { Users } from 'src/users/entities/user.entity';
import { FriendsRelationshipStatus } from './entities/friends-relationshipEnum';

@Injectable()
export class FriendsRelationshipService {
  constructor(
    @InjectRepository(FriendsRelationship)
    private readonly friendsRepo: Repository<FriendsRelationship>,
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,
  ) {}

  async sendRequest(userId: number, friendId: number) {
    if (userId === friendId) {
      throw new BadRequestException(
        "You can't send a friend request to yourself.",
      );
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

    const relationship = this.friendsRepo.create({
      user_id: userId,
      friend_id: friendId,
    });
    return this.friendsRepo.save(relationship);
  }

  async acceptRequest(userId: number, requesterId: number) {
    const relationship = await this.friendsRepo.findOne({
      where: { user_id: requesterId, friend_id: userId },
      relations: ['user', 'friend'],
    });

    if (!relationship) {
      throw new NotFoundException('Friend request not found.');
    }

    if (relationship.is_accepted) {
      throw new BadRequestException('Request already accepted.');
    }

    relationship.is_accepted = true;
    await this.friendsRepo.save(relationship);

    const [userFriends, requesterFriends] = await Promise.all([
      this.getFriendsCount(userId),
      this.getFriendsCount(requesterId),
    ]);

    const userRewarded = await this.checkAndReward(userId, userFriends);
    const requesterRewarded = await this.checkAndReward(
      requesterId,
      requesterFriends,
    );

    return {
      coinsRewarded: userRewarded || requesterRewarded,
    };
  }

  private async getFriendsCount(userId: number): Promise<number> {
    const [sent, received] = await Promise.all([
      this.friendsRepo.count({
        where: { user_id: userId, is_accepted: true, is_blocked: false },
      }),
      this.friendsRepo.count({
        where: { friend_id: userId, is_accepted: true, is_blocked: false },
      }),
    ]);
    return sent + received;
  }

  private async checkAndReward(
    userId: number,
    totalFriends: number,
  ): Promise<boolean> {
    const milestones = [
      { count: 5, coins: 50 },
      { count: 15, coins: 80 },
      { count: 25, coins: 120 },
    ];

    const user = await this.usersRepo.findOneBy({ id: userId });
    if (!user) return false;

    let rewarded = false;

    for (const milestone of milestones) {
      if (totalFriends === milestone.count) {
        user.coins += milestone.coins;
        await this.usersRepo.save(user);
        rewarded = true;
        break;
      }
    }

    return rewarded;
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

  async getFriends(userId: number): Promise<FriendsRelationship[]> {
    const sent = await this.friendsRepo.find({
      where: {
        user_id: userId,
        is_accepted: true,
        is_blocked: false,
      },
      relations: ['friend'], // Popula o amigo
      order: { id: 'ASC' },
    });

    const received = await this.friendsRepo.find({
      where: {
        friend_id: userId,
        is_accepted: true,
        is_blocked: false,
      },
      relations: ['user'], // Popula o solicitante
      order: { id: 'ASC' },
    });

    // Junta os dois resultados para manter a estrutura completa
    return [...sent, ...received];
  }

  async getPendingRequests(userId: number): Promise<FriendsRelationship[]> {
    return this.friendsRepo.find({
      where: {
        friend_id: userId,
        is_accepted: false,
        is_blocked: false,
        status: FriendsRelationshipStatus.PENDING,
      },
      relations: ['friend'], // Popula os dados de quem enviou o pedido
      order: { id: 'ASC' },
    });
  }

  async getPendingRequestsSentByUser(
    userId: number,
  ): Promise<FriendsRelationship[]> {
    return this.friendsRepo.find({
      where: {
        user_id: userId,
        is_accepted: false,
        is_blocked: false,
        status: FriendsRelationshipStatus.PENDING,
      },
      relations: ['friend'], // Traz o usuário para quem ele mandou o pedido
      order: { id: 'ASC' },
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
