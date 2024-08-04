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
} from '@nestjs/common';

import { ReqJwtUser } from 'src/types';

import { DreamService } from './dream.service';
import { CreateDreamDto } from './dto/create-dream.dto';
import { UpdateDreamDto } from './dto/update-dream.dto';

@Controller('dream')
export class DreamController {
  constructor(private readonly dreamService: DreamService) {}

  @Post()
  create(@Body() createDreamDto: CreateDreamDto, @Req() { user }: ReqJwtUser) {
    return this.dreamService.create(createDreamDto, user);
  }

  @Get()
  findAll(@Req() { user }: ReqJwtUser) {
    return this.dreamService.findAll(user.id);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user }: ReqJwtUser,
  ) {
    const dream = await this.dreamService.findOne(id, user);
    return { data: dream || null };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDreamDto: UpdateDreamDto,
    @Req() { user }: ReqJwtUser,
  ) {
    return this.dreamService.update(id, updateDreamDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() { user }: ReqJwtUser) {
    return this.dreamService.remove(id, user);
  }
}
