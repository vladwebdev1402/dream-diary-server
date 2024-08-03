import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  labels: Label[];

  @OneToMany(() => Character, (character) => character.user)
  characters: Character[];

  @OneToMany(() => Dream, (dream) => dream.user)
  dreams: Dream[];
}
