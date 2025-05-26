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
    findFriendRelationsHistoryByUserId(userId: number): Promise<FriendsRelationship[]>;
    getPendingRequestsReceivedByUser(userId: number): Promise<FriendsRelationship[]>;
    private getFriendsCount;
    private checkAndReward;
    rejectedUserFriendRequest(userId: number, targetId: number): Promise<FriendsRelationship>;
    getFriends(userId: number): Promise<FriendsRelationship[]>;
    getPendingRequests(userId: number): Promise<FriendsRelationship[]>;
    getPendingRequestsSentByUser(userId: number): Promise<FriendsRelationship[]>;
    removeRelationship(userId: number, targetId: number): Promise<FriendsRelationship>;
    getRejectedRelationships(userId: number): Promise<FriendsRelationship[]>;
}
