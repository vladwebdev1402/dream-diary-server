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
} from '@nestjs/common';

import { LabelService } from './label.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { ReqJwtUser } from 'src/types';

@Controller('label')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  create(@Body() createLabelDto: CreateLabelDto, @Req() { user }: ReqJwtUser) {
    return this.labelService.create(createLabelDto, user);
  }

  @Get()
  findAll(@Req() { user }: ReqJwtUser) {
    return this.labelService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() { user }: ReqJwtUser) {
    return this.labelService.findOne(id, user);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLabelDto: UpdateLabelDto,
    @Req() { user }: ReqJwtUser,
  ) {
    return this.labelService.update(id, updateLabelDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() { user }: ReqJwtUser) {
    return this.labelService.remove(id, user);
  }
}
