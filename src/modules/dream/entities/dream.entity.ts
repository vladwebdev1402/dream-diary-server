import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/modules/user';
import { Label } from 'src/modules/label';
import { Character } from 'src/modules/character';

@Entity()
export class Dream {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: '' })
  cover: string;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: ['remove', 'update'],
  })
  @JoinColumn()
  user: User;

  @ManyToMany(() => Label, (label) => label.id, {
    cascade: ['remove', 'update'],
  })
  @JoinTable()
  labels: Label[];

  @ManyToMany(() => Character, (character) => character.id, {
    cascade: ['remove', 'update'],
  })
  @JoinTable()
  characters: Character[];
}
