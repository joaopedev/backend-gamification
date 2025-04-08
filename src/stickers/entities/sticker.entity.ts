import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stickers')
export class Sticker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  image_url: string;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'varchar', length: 100 })
  sponsor: string; // Number of stickers in the collection
}
