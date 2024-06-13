import { IsEnum, IsMongoId, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PositionType } from '../../../common/mock/constant.mock';

export class CreatePositionDTO implements Readonly<CreatePositionDTO> {
  @ApiProperty({
    example: 'Electrical Engineering',
  })
  @MaxLength(100)
  @MinLength(1)
  name: string;

  @ApiProperty({
    enum: PositionType,
    example: PositionType.Academic,
  })
  @IsEnum(PositionType)
  type: string;

  @ApiProperty()
  @IsMongoId()
  discipline: string;

  @ApiProperty()
  @IsMongoId()
  field: string;

  @ApiProperty()
  timezone: string;
}
