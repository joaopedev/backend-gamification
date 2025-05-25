import { FriendsRelationshipService } from './friends-relationship.service';
import { CreateFriendsRelationshipDto } from './dto/create-friends-relationship.dto';
export declare class FriendsRelationshipController {
    private readonly service;
    constructor(service: FriendsRelationshipService);
    sendRequest(dto: CreateFriendsRelationshipDto): Promise<import("./entities/friends-relationship.entity").FriendsRelationship>;
    acceptRequest(userId: number, requesterId: number): Promise<{
        coinsRewarded: boolean;
    }>;
    blockUser(userId: number, targetId: number): Promise<import("./entities/friends-relationship.entity").FriendsRelationship>;
    getFriends(userId: number): Promise<import("./entities/friends-relationship.entity").FriendsRelationship[]>;
    getPendingRequestsSentByUser(userId: number): Promise<import("./entities/friends-relationship.entity").FriendsRelationship[]>;
    getRejectedRelationships(userId: number): Promise<import("./entities/friends-relationship.entity").FriendsRelationship[]>;
    remove(userId: number, targetId: number): Promise<import("./entities/friends-relationship.entity").FriendsRelationship>;
}
