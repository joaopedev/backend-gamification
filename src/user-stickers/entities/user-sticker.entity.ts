import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Users } from '../../users/entities/user.entity'; // Import the User entity
import { Sticker } from '../../stickers/entities/sticker.entity'; // Import the Sticker entity

@Entity()
export class UserSticker {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.stickers_number)
  user: Users;

  @ManyToOne(() => Sticker, (sticker) => sticker.id)
  sticker: Sticker;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: "" })
  sponsor?: string;

  @Column({type: 'boolean', default: false})
  pasted: boolean; 
}