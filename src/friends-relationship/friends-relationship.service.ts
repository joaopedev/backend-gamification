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
        'Você não pode enviar uma solicitação de amizade para si mesmo.',
      );
    }

    const existing = await this.friendsRepo.findOne({
      where: [
        { user_id: userId, friend_id: friendId },
        { user_id: friendId, friend_id: userId },
      ],
    });

    if (existing) {
      if (existing.is_rejected) {
        throw new BadRequestException(
          'A solicitação de amizade foi rejeitada. Não é possível reenviar.',
        );
      }
      throw new BadRequestException('A amizade já existe ou está pendente.');
    }

    const relationship = this.friendsRepo.create({
      user_id: userId,
      friend_id: friendId,
    });
    return this.friendsRepo.save(relationship);
  }

  async acceptRequest(userId: number, requesterId: number) {
    const relationship = await this.friendsRepo.findOne({
      where: {
        user_id: requesterId,
        friend_id: userId,
      },
      relations: ['user', 'friend'],
    });

    if (!relationship) {
      throw new NotFoundException('Solicitação de amizade não encontrada.');
    }

    if (relationship.status === FriendsRelationshipStatus.ACCEPTED) {
      throw new BadRequestException('Pedido já aceito.');
    }

    relationship.status = FriendsRelationshipStatus.ACCEPTED;

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

  async findFriendRelationsHistoryByUserId(userId: number) {
    const relations = await this.friendsRepo.find({
      where: [{ user_id: userId }, { friend_id: userId }],
      relations: ['user', 'friend'],
      order: { id: 'DESC' },
    });

    return relations;
  }

  async getPendingRequestsReceivedByUser(
    userId: number,
  ): Promise<FriendsRelationship[]> {
    return this.friendsRepo.find({
      where: {
        friend_id: userId,
        is_accepted: false,
        is_rejected: false,
        status: FriendsRelationshipStatus.PENDING,
      },
      relations: ['user'],
      order: { id: 'ASC' },
    });
  }

  private async getFriendsCount(userId: number): Promise<number> {
    const [sent, received] = await Promise.all([
      this.friendsRepo.count({
        where: { user_id: userId, is_accepted: true, is_rejected: false },
      }),
      this.friendsRepo.count({
        where: { friend_id: userId, is_accepted: true, is_rejected: false },
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

  async rejectedUserFriendRequest(userId: number, targetId: number) {
    const relationship = await this.friendsRepo.findOne({
      where: [
        { user_id: userId, friend_id: targetId },
        { user_id: targetId, friend_id: userId },
      ],
    });

    if (!relationship) {
      const newRel = this.friendsRepo.create({
        user_id: userId,
        friend_id: targetId,
        is_rejected: true,
      });
      return this.friendsRepo.save(newRel);
    }

    relationship.is_rejected = true;
    relationship.status = FriendsRelationshipStatus.REJECTED;
    return this.friendsRepo.save(relationship);
  }

  async getFriends(userId: number): Promise<FriendsRelationship[]> {
    const sent = await this.friendsRepo.find({
      where: {
        user_id: userId,
        is_accepted: true,
        is_rejected: false,
      },
      relations: ['friend'],
      order: { id: 'ASC' },
    });

    const received = await this.friendsRepo.find({
      where: {
        friend_id: userId,
        is_accepted: true,
        is_rejected: false,
      },
      relations: ['user'],
      order: { id: 'ASC' },
    });

    return [...sent, ...received];
  }

  async getPendingRequests(userId: number): Promise<FriendsRelationship[]> {
    return this.friendsRepo.find({
      where: {
        friend_id: userId,
        is_accepted: false,
        is_rejected: false,
        status: FriendsRelationshipStatus.PENDING,
      },
      relations: ['friend'],
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
        is_rejected: false,
        status: FriendsRelationshipStatus.PENDING,
      },
      relations: ['friend'],
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
      throw new NotFoundException('Relação de amizade não encontrada.');
    }

    return this.friendsRepo.remove(relationship);
  }

  async getRejectedRelationships(
    userId: number,
  ): Promise<FriendsRelationship[]> {
    return this.friendsRepo.find({
      where: [
        { user_id: userId, is_rejected: true },
        { friend_id: userId, is_rejected: true },
      ],
      relations: ['user', 'friend'],
    });
  }
}
