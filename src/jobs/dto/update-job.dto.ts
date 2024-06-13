import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';
import { Location } from '../../common/schemas';
import { LocationDTO } from '../../common/dto';
import { SalaryDTO } from './salary.dto';

export class UpdateJobDTO implements Readonly<UpdateJobDTO> {
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
  doesProvideVisaSponsorship: boolean;

  @ApiProperty({ default: true })
  isActive: boolean;

  @ApiProperty({ default: false })
  isDeleted: boolean;

  @ApiProperty()
  timezone: string;
}
