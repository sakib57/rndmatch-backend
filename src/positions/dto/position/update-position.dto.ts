import { IsMongoId, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePositionDTO implements Readonly<UpdatePositionDTO> {
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
  @IsMongoId()
  field: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  timezone: string;
}
