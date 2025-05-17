import { StickerPack } from 'src/sticker-pack/entities/sticker-pack.entity';
import { UserSticker } from 'src/user-stickers/entities/user-sticker.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('stickers')
export class Sticker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  image_url: string;

  @Column({ type: 'varchar', length: 100 })
  sponsor: string; // Number of stickers in the collection

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @ManyToOne(() => StickerPack, (stickerPack) => stickerPack.stickers)
  stickerPack: StickerPack[];

  @Column({ type: 'varchar', length: 100 })
  category: string; // Category of the sticker

  @Column({ type: 'varchar', length: 100, nullable: true })
  section: string; // Area of the sticker

  @Column({ type: 'varchar', length: 100 })
  sub_category?: string; // Area of the sticker

  @Column({ type: 'simple-json', nullable: true })
  links?: string[];

  @OneToMany(() => UserSticker, (userSticker) => userSticker.sticker)
  userStickers: UserSticker[];
}
