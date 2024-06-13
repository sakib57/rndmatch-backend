import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsMongoId, IsNumber } from 'class-validator';
import { MediaDTO } from '../../common/dto';
import { Media } from '../../common/schemas';
import { ScreeningStatus } from '../../common/mock/constant.mock';

export class CreateJobApplicationDTO
  implements Readonly<CreateJobApplicationDTO>
{
  @ApiProperty()
  @IsMongoId()
  job: string;

  @ApiProperty()
  @IsMongoId()
  jobSeeker: string;

  @ApiProperty({
    enum: ScreeningStatus,
    example: ScreeningStatus.HOLD,
  })
  @IsEnum(ScreeningStatus)
  status: string;

  @ApiProperty()
  @IsNumber()
  applicationDate: number;

  @ApiProperty()
  interviewDate: number;

  @ApiProperty()
  @IsArray()
  hiringTeam: string[];

  @ApiProperty()
  isRequiredVisaSponsorship: boolean;

  @ApiProperty()
  timezone: string;
}
