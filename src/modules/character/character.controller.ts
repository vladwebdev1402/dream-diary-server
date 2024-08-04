import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  ParseIntPipe,
  BadRequestException,
  Put,
} from '@nestjs/common';

import { ReqJwtUser } from 'src/types';
import { BaseResolver } from 'src/utils';

import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('character')
export class CharacterController extends BaseResolver {
  constructor(private readonly characterService: CharacterService) {
    super();
  }

  @Post()
  async create(
    @Body() createCharacterDto: CreateCharacterDto,
    @Req() { user }: ReqJwtUser,
  ) {
    const character = await this.characterService.create(
      createCharacterDto,
      user,
    );
    return this.resolveSuccess({ character });
  }

  @Get()
  async findAll(@Req() { user }: ReqJwtUser) {
    const characters = await this.characterService.findAll(user);
    return this.resolveSuccess({ characters });
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user }: ReqJwtUser,
  ) {
    const character = await this.characterService.findOne(id, user);

    if (!character) {
      throw new BadRequestException(
        this.resolveCatch(
          'Персонаж не найден либо вы не имеете доступа к нему',
        ),
      );
    }

    return this.resolveSuccess({ character });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
    @Req() { user }: ReqJwtUser,
  ) {
    const character = await this.characterService.update(
      id,
      updateCharacterDto,
      user,
    );

    if (!character) {
      throw new BadRequestException(
        this.resolveCatch(
          'Персонаж не найден либо вы не имеете доступа к нему',
        ),
      );
    }

    return this.resolveSuccess({ character });
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user }: ReqJwtUser,
  ) {
    const character = await this.characterService.remove(id, user);

    if (!character) {
      throw new BadRequestException(
        this.resolveCatch(
          'Персонаж не найден либо вы не имеете доступа к нему',
        ),
      );
    }

    return this.resolveSuccess({ character });
  }
}
