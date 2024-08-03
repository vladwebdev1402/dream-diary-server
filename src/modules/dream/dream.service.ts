import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { CreateDreamDto } from './dto/create-dream.dto';
import { UpdateDreamDto } from './dto/update-dream.dto';

import { Dream } from './entities/dream.entity';

@Injectable()
export class DreamService {
  constructor(private dataSourse: DataSource) {}

  async create(createDreamDto: CreateDreamDto) {
    return await this.dataSourse.manager.save(Dream, createDreamDto);
  }

  async findAll(userId: number) {
    return this.dataSourse.manager.find(Dream, {
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} dream`;
  }

  update(id: number, updateDreamDto: UpdateDreamDto) {
    return `This action updates a #${id} dream`;
  }

  remove(id: number) {
    return `This action removes a #${id} dream`;
  }
}
