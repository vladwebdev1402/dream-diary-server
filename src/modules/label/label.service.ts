import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtUser } from 'src/types';

import { Label } from './entities/label.entity';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(Label) private labelRepository: Repository<Label>,
  ) {}

  async create(createLabelDto: CreateLabelDto, user: JwtUser) {
    const createdLabel = await this.labelRepository.save({
      ...createLabelDto,
      user,
    });

    delete createdLabel.user;

    return createdLabel;
  }

  async findAll(user: JwtUser) {
    const labels = await this.labelRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    return labels;
  }

  async findOne(id: number, user: JwtUser) {
    const label = await this.labelRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
    });

    return label;
  }

  async update(id: number, updateLabelDto: UpdateLabelDto, user: JwtUser) {
    const updateLabel = await this.findOne(id, user);

    if (!updateLabel) return null;

    const updatedLabel = await this.labelRepository.save({
      ...updateLabel,
      ...updateLabelDto,
    });

    return updatedLabel;
  }

  async remove(id: number, user: JwtUser) {
    const removeLabel = await this.findOne(id, user);

    if (!removeLabel) return null;

    return await this.labelRepository.remove(removeLabel);
  }
}
