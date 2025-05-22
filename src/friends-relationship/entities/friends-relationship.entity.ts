import { Users } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FriendsRelationshipStatus } from './friends-relationshipEnum';

@Entity()
export class FriendsRelationship {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  user_id: number; // ID of the user who sent the friend request

  @Column()
  friend_id: number; // ID of the user who received the friend request

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'friend_id' })
  friend: Users;

  @Column({ default: false })
  is_accepted: boolean; // Indicates if the friend request has been accepted

  @Column({ default: false })
  is_blocked: boolean; // Indicates if the user has blocked the friend

  @Column({ type: 'enum', enum: FriendsRelationshipStatus, default: 'PENDING' })
  status: FriendsRelationshipStatus;
}
