import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { userPreference } from '../../common/mock/constant.mock';

export class AuthDTO {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  readonly password: string;

  @IsBoolean()
  readonly isSuperAdmin: boolean;

  @IsBoolean()
  readonly isAdmin: boolean;

  @ApiProperty({
    enum: userPreference,
  })
  @IsEnum(userPreference)
  userPreference: userPreference;
}
