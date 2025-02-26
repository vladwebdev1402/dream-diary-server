import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/modules/user';

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 'gray' })
  type: 'gray' | 'blue' | 'red' | 'gold' | 'green';

  @ManyToOne(() => User, (user) => user.id, {
    cascade: ['remove', 'update'],
  })
  @JoinColumn()
  user: User;
}
