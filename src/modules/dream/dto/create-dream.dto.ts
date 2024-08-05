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
  id: number;

  @IsString()
  description: string;

  @IsString()
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
  name: string;

  @IsNotEmpty({ message: 'Описание обязательно для заполнения' })
  @IsString()
  description: string;

  @IsOptional()
  @Type(() => Character)
  @IsArray()
  @ValidateNested({ each: true })
  characters?: Character[];

  @IsOptional()
  @Type(() => Label)
  @IsArray()
  @ValidateNested({ each: true })
  labels?: Label[];

  @IsOptional()
  date: string;

  @IsOptional()
  @IsString()
  cover: string;
}
