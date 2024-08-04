import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  ParseIntPipe,
  Put,
  BadRequestException,
} from '@nestjs/common';

import { ReqJwtUser } from 'src/types';
import { BaseResolver } from 'src/utils';

import { DreamService } from './dream.service';
import { CreateDreamDto } from './dto/create-dream.dto';
import { UpdateDreamDto } from './dto/update-dream.dto';

@Controller('dream')
export class DreamController extends BaseResolver {
  constructor(private readonly dreamService: DreamService) {
    super();
  }

  @Post()
  async create(
    @Body() createDreamDto: CreateDreamDto,
    @Req() { user }: ReqJwtUser,
  ) {
    const dream = await this.dreamService.create(createDreamDto, user);
    return this.resolveSuccess({ dream });
  }

  @Get()
  async findAll(@Req() { user }: ReqJwtUser) {
    const dreams = await this.dreamService.findAll(user.id);
    return this.resolveSuccess({ dreams });
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user }: ReqJwtUser,
  ) {
    const dream = await this.dreamService.findOne(id, user);

    if (!dream) {
      throw new BadRequestException(
        this.resolveCatch('Сон не найден либо вы не имеете доступа к нему'),
      );
    }

    return this.resolveSuccess({ dream });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDreamDto: UpdateDreamDto,
    @Req() { user }: ReqJwtUser,
  ) {
    const dream = await this.dreamService.update(id, updateDreamDto, user);

    if (!dream) {
      throw new BadRequestException(
        this.resolveCatch('Сон не найден либо вы не имеете доступа к нему'),
      );
    }

    return this.resolveSuccess({ dream });
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user }: ReqJwtUser,
  ) {
    const dream = await this.dreamService.remove(id, user);

    if (!dream) {
      throw new BadRequestException(
        this.resolveCatch('Сон не найден либо вы не имеете доступа к нему'),
      );
    }

    return this.resolveSuccess({ dream });
  }
}
