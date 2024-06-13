import { IsEnum, MaxLength, MinLength, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  EmploymentType,
  JobIndustry,
} from '../../../common/mock/constant.mock';
import { LocationDTO } from '../../../common/dto';
import { Location } from '../../../common/schemas';

export class ExperienceDTO implements Readonly<ExperienceDTO> {
  @ApiProperty({
    example: 'Software Engineer',
  })
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(1)
  designation: string;

  @ApiProperty({
    enum: EmploymentType,
    example: EmploymentType.FULL_TIME,
  })
  @IsEnum(EmploymentType)
  employmentType: EmploymentType;

  @ApiProperty({
    example: 'RndMatch',
  })
  @MaxLength(50)
  @MinLength(1)
  organization: string;

  @ApiProperty({
    enum: JobIndustry,
    example: JobIndustry.INFORMATION,
  })
  @IsEnum(JobIndustry)
  industry: JobIndustry;

  @ApiProperty({
    example: 'We provide technological solution',
  })
  headline: string;

  @ApiProperty()
  @MaxLength(5000)
  description: string;

  @ApiProperty()
  @MaxLength(2000)
  roles: string;

  @ApiProperty({
    type: LocationDTO,
  })
  @Type(() => LocationDTO)
  location: Location;

  @ApiProperty()
  startDate: number;

  @ApiProperty()
  endDate: number;

  @ApiProperty({
    default: true,
  })
  isStillWorking: boolean;

  @ApiProperty({
    default: false,
  })
  isDeleted: boolean;
}
