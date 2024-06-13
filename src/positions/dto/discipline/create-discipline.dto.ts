import { MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDisciplineDTO implements Readonly<CreateDisciplineDTO> {
  @ApiProperty({
    example: 'Engineering',
  })
  @MaxLength(100)
  @MinLength(1)
  name: string;

  @ApiProperty()
  timezone: string;
}
