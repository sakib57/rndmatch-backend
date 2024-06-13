import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsString,
  Max,
  ValidateNested,
} from 'class-validator';
import { Location, Media } from '../../common/schemas';
import { LocationDTO, MediaDTO } from '../../common/dto';
import {
  EmploymentType,
  Status,
  WorkType,
} from '../../common/mock/constant.mock';
import { SalaryDTO } from './salary.dto';
import { PositionTitle } from '../schemas/position-title.schema';
import { PositionTitleDTO } from './position-title.dto';

export class JobDTO implements Readonly<JobDTO> {
  @ApiProperty({
    type: [PositionTitleDTO],
  })
  @ValidateNested({ each: true })
  @Type(() => PositionTitleDTO)
  @Max(3)
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
  @IsString()
  slug: string;

  @ApiProperty({
    type: MediaDTO,
  })
  @Type(() => MediaDTO)
  jobPic: Media;

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
  @IsEnum(WorkType)
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
  salaryRange: Location;

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

  @ApiProperty({ default: true })
  isActive: boolean;

  @ApiProperty({ default: false })
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
