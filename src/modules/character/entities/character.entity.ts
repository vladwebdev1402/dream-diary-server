import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/modules/user';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  avatarUrl: string;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: ['remove', 'update']
  })
  @JoinColumn()
  user: User;
}
