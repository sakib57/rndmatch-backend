import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsString } from 'class-validator';
import { LocationDTO } from '../../common/dto';
import { Location } from '../../common/schemas';
import { SalaryDTO } from '../../jobs/dto';
import { Salary } from '../../jobs/schemas/salary.schema';

export class CreateStreamDTO implements Readonly<CreateStreamDTO> {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsArray()
  position: string[];

  @ApiProperty()
  @IsString()
  jobTitle: string;

  @ApiProperty()
  @IsArray()
  primarySkills: string[];

  @ApiProperty()
  @IsArray()
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

  @ApiProperty()
  cTime: number;

  @ApiProperty()
  cBy: string;

  @ApiProperty()
  timezone: string;
}
