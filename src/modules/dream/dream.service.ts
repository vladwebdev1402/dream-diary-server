import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtUser } from 'src/types';

import { CreateDreamDto } from './dto/create-dream.dto';
import { UpdateDreamDto } from './dto/update-dream.dto';
import { Dream } from './entities/dream.entity';

@Injectable()
export class DreamService {
  constructor(
    @InjectRepository(Dream) private dreamRepositry: Repository<Dream>,
  ) {}

  async create(createDreamDto: CreateDreamDto, user: JwtUser) {
    const newDream = await this.dreamRepositry.save({
      ...createDreamDto,
      user,
    });
    delete newDream.user;
    return newDream;
  }

  async findAll(userId: number) {
    return await this.dreamRepositry.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['characters', 'labels'],
    });
  }

  async findOne(id: number, user: JwtUser) {
    const dream = await this.dreamRepositry.findOne({
      where: {
        id: id,
        user: {
          id: user.id,
        },
      },
    });

    return dream;
  }

  async update(id: number, updateDreamDto: UpdateDreamDto, user: JwtUser) {
    const dreamForUpdate = await this.findOne(id, user);

    if (!dreamForUpdate) return null;

    const updatedDream = await this.dreamRepositry.save({
      ...dreamForUpdate,
      ...updateDreamDto,
    });

    return updatedDream;
  }

  async remove(id: number, user: JwtUser) {
    const deletedDream = await this.findOne(id, user);

    if (!deletedDream) return null;

    return await this.dreamRepositry.remove(deletedDream);
  }
}
