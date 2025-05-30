import { Users } from 'src/users/entities/user.entity';
import { FriendsRelationshipStatus } from './friends-relationshipEnum';
export declare class FriendsRelationship {
    id: number;
    user_id: number;
    friend_id: number;
    user: Users;
    friend: Users;
    is_accepted: boolean;
    is_rejected: boolean;
    status: FriendsRelationshipStatus;
}
