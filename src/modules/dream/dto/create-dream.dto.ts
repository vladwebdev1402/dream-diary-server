import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Character } from 'src/modules/character';
import { Label } from 'src/modules/label';

export class CreateDreamDto {
  @IsNotEmpty({ message: 'Название обязательно для заполнения' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Описание обязательно для заполнения' })
  @IsString()
  description: string;

  avatarUrl?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => Character)
  characters?: Character[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => Label)
  labels?: Label[];
}
