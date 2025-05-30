import { UserSticker } from "src/user-stickers/entities/user-sticker.entity";
import { Users } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'int', default: 160 })
  total_stickers: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  image_url?: string;

  @ManyToMany(() => UserSticker, (stickers) => stickers.albums)
  stickers?: number[];

  @ManyToMany(() => Users, (user) => user.albums)
  users: Users[];
}