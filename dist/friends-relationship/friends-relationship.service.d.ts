import { Repository } from 'typeorm';
import { FriendsRelationship } from './entities/friends-relationship.entity';
import { Users } from 'src/users/entities/user.entity';
export declare class FriendsRelationshipService {
    private readonly friendsRepo;
    private readonly usersRepo;
    constructor(friendsRepo: Repository<FriendsRelationship>, usersRepo: Repository<Users>);
    sendRequest(userId: number, friendId: number): Promise<FriendsRelationship>;
    acceptRequest(userId: number, requesterId: number): Promise<{
        coinsRewarded: boolean;
    }>;
    private getFriendsCount;
    private checkAndReward;
    blockUser(userId: number, targetId: number): Promise<FriendsRelationship>;
    getFriends(userId: number): Promise<number[]>;
    getPendingRequests(userId: number): Promise<FriendsRelationship[]>;
    removeRelationship(userId: number, targetId: number): Promise<FriendsRelationship>;
}
