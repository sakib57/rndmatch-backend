import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { MediaDTO } from 'src/common/dto';
import { Media } from 'src/common/schemas';
import { ScreeningStatus } from '../../common/mock/constant.mock';

export class UpdateJobApplicationDTO
  implements Readonly<UpdateJobApplicationDTO>
{
  @ApiProperty()
  @Type(() => MediaDTO)
  resume: Media;

  @ApiProperty({
    enum: ScreeningStatus,
    example: ScreeningStatus.HOLD,
  })
  @IsEnum(ScreeningStatus)
  status: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;

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
