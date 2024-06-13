import { IsEnum, IsMongoId, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PositionType } from '../../../common/mock/constant.mock';

export class PositionDTO implements Readonly<PositionDTO> {
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
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  cTime: number;

  @ApiProperty()
  cBy: string;

  @ApiProperty()
  uTime: number;

  @ApiProperty()
  uBy: string;

  @ApiProperty()
  dTime: number;

  @ApiProperty()
  dBy: string;

  @ApiProperty()
  timezone: string;
}
