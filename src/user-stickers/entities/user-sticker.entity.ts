import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Sticker } from '../../stickers/entities/sticker.entity';

@Entity('user_stickers')
export class UserSticker {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.userStickers, { nullable: false })
  @JoinColumn({ name: 'user_id' }) 
  user: Users;

  @ManyToOne(() => Sticker, (sticker) => sticker.userStickers, { nullable: false })
  @JoinColumn({ name: 'sticker_id' })
  sticker: Sticker;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: '' })
  sponsor?: string;

  @Column({ type: 'boolean', default: false })
  pasted: boolean;
}
