import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Location } from '../../common/schemas';
import { LocationDTO } from '../../common/dto';
import {
  EmploymentType,
  PositionType,
  Status,
  WorkType,
} from '../../common/mock/constant.mock';
import { SalaryDTO } from './salary.dto';
import { Salary } from '../schemas/salary.schema';

export class PositionTitleDTO implements Readonly<PositionTitleDTO> {
  @ApiProperty({
    enum: PositionType,
    default: PositionType.Academic,
  })
  @IsEnum(PositionType)
  type: string;

  @ApiProperty()
  @IsMongoId()
  position: string;

  @ApiProperty()
  @IsMongoId()
  field: string;

  @ApiProperty()
  @IsMongoId()
  discipline: string;
}
