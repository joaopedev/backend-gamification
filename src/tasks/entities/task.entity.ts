import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Import the User entity

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  reward: number; // Moedas que o usuário ganha ao completar a tarefa

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  completedAt: Date;
}