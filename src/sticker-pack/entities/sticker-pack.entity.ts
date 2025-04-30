import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Sticker } from 'src/stickers/entities/sticker.entity';

@Entity('sticker_packs')
export class StickerPack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @ManyToOne(() => Users, (user) => user)
  user: Users;

  @OneToMany(() => Sticker, (sticker) => sticker.stickerPack, { cascade: true })
  stickers: Sticker[];
}
