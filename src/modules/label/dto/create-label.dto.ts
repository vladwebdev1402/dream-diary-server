import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateLabelDto {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @IsIn(['gray', 'blue', 'red', 'gold', 'green'])
  @ApiProperty({
    enum: ['gray', 'blue', 'red', 'gold', 'green'],
    enumName: 'LabelType',
  })
  type: 'gray' | 'blue' | 'red' | 'gold' | 'green';
}
