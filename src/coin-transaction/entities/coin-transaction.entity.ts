import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Users } from '../../users/entities/user.entity'; // Import the User entity

@Entity()
export class CoinTransaction {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'enum', enum: ['TASK', 'QR_CODE'] })
  type: 'TASK' | 'QR_CODE';

  @Column()
  coins: number; // Quantidade de moedas recebidas

  @ManyToOne(() => Users, (user) => user.transactions)
  user: Users;

  @CreateDateColumn()
  createdAt: Date;
}