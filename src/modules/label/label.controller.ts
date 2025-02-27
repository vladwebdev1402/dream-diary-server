import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  Req,
  BadRequestException,
} from '@nestjs/common';

import { ReqJwtUser } from 'src/types';
import { BaseResolver } from 'src/utils';

import { LabelService } from './label.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { LabelDto } from './dto';

@Controller('label')
export class LabelController extends BaseResolver {
  constructor(private readonly labelService: LabelService) {
    super();
  }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: LabelDto,
  })
  @ApiBody({
    type: CreateLabelDto,
  })
  async create(
    @Body() createLabelDto: CreateLabelDto,
    @Req() { user }: ReqJwtUser,
  ) {
    const label = await this.labelService.create(createLabelDto, user);
    return this.resolveSuccess({ label });
  }

  @Get()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: LabelDto,
    isArray: true,
  })
  async findAll(@Req() { user }: ReqJwtUser) {
    const labels = await this.labelService.findAll(user);
    return this.resolveSuccess({ labels });
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: LabelDto,
    isArray: true,
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user }: ReqJwtUser,
  ) {
    const label = await this.labelService.findOne(id, user);

    if (!label) {
      throw new BadRequestException(
        this.resolveCatch('Тег не найден либо вы не имеете доступа к нему'),
      );
    }
    return this.resolveSuccess({ label });
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateLabelDto,
  })
  @ApiCreatedResponse({
    type: LabelDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLabelDto: UpdateLabelDto,
    @Req() { user }: ReqJwtUser,
  ) {
    const label = await this.labelService.update(id, updateLabelDto, user);

    if (!label) {
      throw new BadRequestException(
        this.resolveCatch('Тег не найден либо вы не имеете доступа к нему'),
      );
    }

    return this.resolveSuccess({ label });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: LabelDto,
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user }: ReqJwtUser,
  ) {
    const label = await this.labelService.remove(id, user);

    if (!label) {
      throw new BadRequestException(
        this.resolveCatch('Тег не найден либо вы не имеете доступа к нему'),
      );
    }

    return this.resolveSuccess({ label });
  }
}
