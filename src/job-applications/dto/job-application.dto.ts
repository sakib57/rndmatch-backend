import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsMongoId, IsNumber } from 'class-validator';
import { MediaDTO } from '../../common/dto';
import { Media } from '../../common/schemas';
import { ScreeningStatus } from '../../common/mock/constant.mock';

export class JobApplicationDTO implements Readonly<JobApplicationDTO> {
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

  @ApiProperty({
    type: MediaDTO,
  })
  @Type(() => MediaDTO)
  resume: Media;

  @ApiProperty()
  isRequiredVisaSponsorship: boolean;

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
