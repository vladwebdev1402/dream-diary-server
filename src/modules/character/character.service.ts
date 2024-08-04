import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtUser } from 'src/types';

import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto, user: JwtUser) {
    const character = await this.characterRepository.save({
      ...createCharacterDto,
      user: {
        id: user.id,
      },
    });

    if (new Object(character).hasOwnProperty('user')) delete character.user;

    return character;
  }

  async findAll(user: JwtUser) {
    const characters = await this.characterRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    return characters;
  }

  async findOne(id: number, user: JwtUser) {
    const character = this.characterRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
    });

    if (!character) return null;

    return character;
  }

  async update(
    id: number,
    updateCharacterDto: UpdateCharacterDto,
    user: JwtUser,
  ) {
    const updateCharacter = await this.findOne(id, user);

    if (!updateCharacter) return null;

    const updatedCharacter = await this.characterRepository.save({
      ...updateCharacter,
      ...updateCharacterDto,
    });

    return updatedCharacter;
  }

  async remove(id: number, user: JwtUser) {
    const character = await this.findOne(id, user);

    if (!character) return null;

    const removedCharacter = await this.characterRepository.remove({
      ...character,
    });

    return removedCharacter;
  }
}
