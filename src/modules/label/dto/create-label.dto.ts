import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateLabelDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsString()
  @IsIn(['gray', 'blue', 'red', 'gold', 'green'])
  type: 'gray' | 'blue' | 'red' | 'gold' | 'green';
}
