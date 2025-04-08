import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Import the User entity
import { Sticker } from '../../stickers/entities/sticker.entity'; // Import the Sticker entity

@Entity()
export class UserSticker {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.stickers_number)
  user: User;

  @ManyToOne(() => Sticker, (sticker) => sticker.id)
  sticker: Sticker;

  @Column({ default: 1 })
  quantity: number;
}