import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}