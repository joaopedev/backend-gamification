import { Users } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('completed_pages')
@Unique(['user', 'page_index']) // Garante 1 ticket por página por usuário
export class CompletedPage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'int' })
  page_index: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  ticket: string;

  @CreateDateColumn({ type: 'timestamp' })
  completed_at: Date;
}
