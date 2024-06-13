import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { userPreference } from '../../../common/mock/constant.mock';

export class UserDTO implements Readonly<UserDTO> {
  @ApiProperty({
    example: 'john@mail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '8tJ!ACq7fXg6@#',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @MinLength(5)
  @Matches(/^[^\s]+(\s+[^\s]+)*$/)
  password: string;

  @ApiProperty({
    enum: userPreference,
    default: userPreference.JOB_SEEKER,
  })
  @IsEnum(userPreference)
  userPreference: userPreference;

  @ApiProperty()
  otp: number;

  @ApiProperty()
  otpExpiresAt: number;

  @ApiProperty()
  emailProofToken: string;

  @ApiProperty()
  emailProofTokenExpiresAt: number;

  @ApiProperty()
  passwordResetToken: string;

  @ApiProperty()
  passwordResetTokenExpiresAt: number;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  isSuperAdmin: boolean;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isVerified: boolean;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  isRegistered: boolean;

  @ApiProperty()
  @IsBoolean()
  isFake: boolean;

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
}
