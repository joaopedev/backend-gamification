import { Repository } from 'typeorm';
import { FriendsRelationship } from './entities/friends-relationship.entity';
export declare class FriendsRelationshipService {
    private readonly friendsRepo;
    constructor(friendsRepo: Repository<FriendsRelationship>);
    sendRequest(userId: number, friendId: number): Promise<FriendsRelationship>;
    acceptRequest(userId: number, requesterId: number): Promise<FriendsRelationship>;
    blockUser(userId: number, targetId: number): Promise<FriendsRelationship>;
    getFriends(userId: number): Promise<number[]>;
    getPendingRequests(userId: number): Promise<FriendsRelationship[]>;
    removeRelationship(userId: number, targetId: number): Promise<FriendsRelationship>;
}
