import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsString,
  Max,
  ValidateNested,
} from 'class-validator';
import { Location } from '../../common/schemas';
import { LocationDTO } from '../../common/dto';
import {
  EmploymentType,
  Status,
  WorkType,
} from '../../common/mock/constant.mock';
import { SalaryDTO } from './salary.dto';
import { Salary } from '../schemas/salary.schema';
import { PositionTitleDTO } from './position-title.dto';
import { PositionTitle } from '../schemas/position-title.schema';

export class CreateJobDTO implements Readonly<CreateJobDTO> {
  @ApiProperty({
    type: [PositionTitleDTO],
  })
  @ValidateNested({ each: true })
  @Type(() => PositionTitleDTO)
  positionTitle: [PositionTitle];

  @ApiProperty({
    enum: Status,
    default: Status.DRAFT,
  })
  @IsEnum(Status)
  status: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsArray()
  internalLevels: string[];

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  interviewProcess: string;

  @ApiProperty({
    enum: EmploymentType,
    default: EmploymentType.FULL_TIME,
  })
  @IsEnum(EmploymentType)
  employmentType: string;

  @ApiProperty({ example: [WorkType.ON_SITE] })
  @IsArray()
  workTypes: string[];

  @ApiProperty()
  @IsArray()
  seniorityLevels: string[];

  @ApiProperty()
  @IsString()
  industry: string;

  @ApiProperty({
    type: LocationDTO,
  })
  @Type(() => LocationDTO)
  @ValidateNested({ each: true })
  location: Location;

  @ApiProperty()
  @IsString()
  education: string;

  @ApiProperty()
  @IsArray()
  primarySkills: string[];

  @ApiProperty()
  @IsArray()
  secondarySkills: string[];

  @ApiProperty()
  @IsArray()
  techStacks: string[];

  @ApiProperty({
    type: SalaryDTO,
  })
  @Type(() => SalaryDTO)
  @ValidateNested({ each: true })
  salaryRange: Salary;

  @ApiProperty()
  @IsNumber()
  deadline: number;

  @ApiProperty()
  @IsBoolean()
  hasSubscription: boolean;

  @ApiProperty()
  @IsArray()
  hiringTeam: string[];

  @ApiProperty()
  @IsMongoId()
  organization: string;

  @ApiProperty()
  @IsMongoId()
  postBy: string;

  @ApiProperty()
  @IsBoolean()
  doesProvideVisaSponsorship: boolean;

  @ApiProperty()
  timezone: string;
}
