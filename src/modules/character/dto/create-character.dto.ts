import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  avatarlUrl: string;
}
