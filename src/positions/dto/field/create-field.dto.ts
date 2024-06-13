import { IsMongoId, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFieldDTO implements Readonly<CreateFieldDTO> {
  @ApiProperty({
    example: 'Electrical Engineering',
  })
  @MaxLength(100)
  @MinLength(1)
  name: string;

  @ApiProperty()
  @IsMongoId()
  discipline: string;

  @ApiProperty()
  timezone: string;
}
