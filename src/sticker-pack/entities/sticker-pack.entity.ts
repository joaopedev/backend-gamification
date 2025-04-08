import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity('sticker_packs')
export class StickerPack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'varchar', length: 100 })
  image_url: string;

  @OneToMany(() => User, (user) => user)
  user: User;

  @Column({ type: 'varchar', length: 100 })
  sponsor: string; // Number of stickers in the collection

  @Column({type: 'boolean', default: false})
  pasted: boolean; // Indicates if the sticker pack is pasted or not
}
