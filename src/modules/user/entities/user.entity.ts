import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Character } from 'src/modules/character';
import { Dream } from 'src/modules/dream';
import { Label } from 'src/modules/label';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mail: string;

  @Column()
  password: string;

  @OneToMany(() => Label, (label) => label.user)
  @JoinColumn()
  labels: Label[];

  @OneToMany(() => Character, (character) => character.user)
  @JoinColumn()
  characters: Character[];

  @OneToMany(() => Dream, (dream) => dream.user)
  @JoinColumn()
  dreams: Dream[];
}
