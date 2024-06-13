import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsString } from 'class-validator';
import { LocationDTO } from '../../common/dto';
import { Location } from '../../common/schemas';
import { SalaryDTO } from '../../jobs/dto';
import { Salary } from '../../jobs/schemas/salary.schema';

export class StreamDTO implements Readonly<StreamDTO> {
  @ApiProperty()
  @IsString()
  @IsMongoId()
  user: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsMongoId()
  position: string[];

  @ApiProperty()
  @IsString()
  sortBy: string;

  @ApiProperty()
  @IsString()
  jobTitle: string;

  @ApiProperty()
  @IsMongoId()
  primarySkills: string[];

  @ApiProperty()
  @IsMongoId()
  allSkills: string[];

  @ApiProperty({
    type: SalaryDTO,
  })
  @Type(() => SalaryDTO)
  salaryRange: Salary;

  @ApiProperty()
  workType: string[];

  @ApiProperty()
  @IsArray()
  experienceLevel: string[];

  @ApiProperty()
  workEligibility: string[];

  @ApiProperty({
    type: LocationDTO,
  })
  @Type(() => LocationDTO)
  currentLocation: Location;

  @ApiProperty()
  underrepresentedGroups: string[];

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
  timezone: string;

  @ApiProperty()
  dTime: number;

  @ApiProperty()
  dBy: string;
}
