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
  sponsor: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @ManyToOne(() => StickerPack, (stickerPack) => stickerPack.stickers)
  stickerPack: StickerPack;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  section: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  sub_category: string;

  @Column({ type: 'simple-json', nullable: true })
  links?: string[];

  @OneToMany(() => UserSticker, (us) => us.sticker)
  userStickers: UserSticker[];
}
