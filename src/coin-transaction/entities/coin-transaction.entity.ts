import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Import the User entity

@Entity()
export class CoinTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['TASK', 'QR_CODE'] })
  type: 'TASK' | 'QR_CODE';

  @Column()
  amount: number; // Quantidade de moedas recebidas

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}