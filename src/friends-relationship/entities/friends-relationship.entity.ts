import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class FriendsRelationship {
    @PrimaryColumn()
    user_id: number; // ID of the user who sent the friend request

    @Column()
    friend_id: number; // ID of the user who received the friend request

    @Column({ default: false })
    is_accepted: boolean; // Indicates if the friend request has been accepted

    @Column({ default: false })
    is_blocked: boolean; // Indicates if the user has blocked the friend

    @Column({ default: false })
    is_pending: boolean; // Indicates if the friend request is pending
}
