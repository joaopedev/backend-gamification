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

  @Column({ type: 'varchar', length: 500, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  image_url: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  sponsor: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;

  @ManyToOne(() => StickerPack, (stickerPack) => stickerPack.stickers)
  stickerPack: StickerPack;

  @Column({ type: 'varchar', length: 500, nullable: true })
  category: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  section: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  sub_category: string;

  @Column({ type: 'simple-json', nullable: true })
  links?: string[];

  @OneToMany(() => UserSticker, (us) => us.sticker)
  userStickers: UserSticker[];
}
