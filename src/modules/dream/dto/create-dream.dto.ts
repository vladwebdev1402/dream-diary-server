import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CreateCharacterDto } from 'src/modules/character/dto';
import { CreateLabelDto } from 'src/modules/label/dto';

class Character extends CreateCharacterDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  avatarUrl: string;
}

class Label extends CreateLabelDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsIn(['gray', 'blue', 'red', 'gold', 'green'])
  type: 'gray' | 'blue' | 'red' | 'gold' | 'green';
}

export class CreateDreamDto {
  @IsNotEmpty({ message: 'Название обязательно для заполнения' })
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: 'Описание обязательно для заполнения' })
  @IsString()
  @ApiProperty()
  description: string;

  @IsOptional()
  @Type(() => Character)
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty()
  characters?: Character[];

  @IsOptional()
  @Type(() => Label)
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty()
  labels?: Label[];

  @IsOptional()
  @ApiProperty()
  date: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  cover: string;
}
