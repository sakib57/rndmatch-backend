import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { userPreference } from '../../../common/mock/constant.mock';

export class UpdateUserDTO implements Readonly<UpdateUserDTO> {
  @ApiProperty({
    enum: userPreference,
    default: userPreference.JOB_SEEKER,
  })
  @IsEnum(userPreference)
  userPreference: userPreference;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isVerified: boolean;

  @ApiProperty({
    default: false,
  })
  isDeleted: boolean;

  @ApiProperty()
  isRegistered: boolean;

  @ApiProperty()
  timezone: string;
}
