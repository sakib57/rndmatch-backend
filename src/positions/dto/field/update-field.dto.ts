import { IsMongoId, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFieldDTO implements Readonly<UpdateFieldDTO> {
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
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  timezone: string;
}
