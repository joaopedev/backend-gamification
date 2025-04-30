import { StickerPack } from 'src/sticker-pack/entities/sticker-pack.entity';
import { Users } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stickers')
export class Sticker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  image_url: string;

  @ManyToOne(() => Users)
  user: Users;

  @Column({ type: 'varchar', length: 100 })
  sponsor: string; // Number of stickers in the collection

  @Column({type: 'boolean', default: false})
  pasted: boolean; // Indicates if the sticker pack is pasted or not

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @ManyToOne(() => StickerPack, (stickerPack) => stickerPack.stickers)
  stickerPack: StickerPack[];

  @Column({ type: 'varchar', length: 100 })
  category: string; // Category of the sticker

  @Column({ type: 'varchar', length: 100 })
  area: string; // Area of the sticker

  @Column({ type: 'varchar', length: 100 })
  sub_category?: string; // Area of the sticker
}
