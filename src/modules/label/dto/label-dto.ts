import { ApiProperty } from '@nestjs/swagger';

export class LabelDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ enumName: 'LabelType' })
  type: 'gray' | 'blue' | 'red' | 'gold' | 'green';
}
