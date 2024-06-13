import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { userPreference } from '../../../common/mock/constant.mock';

export class CreateUserDTO implements Readonly<CreateUserDTO> {
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

  @ApiProperty({
    example: 'John',
  })
  @MaxLength(30)
  @MinLength(3)
  @Matches(/^[a-zA-Z ]+$/)
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Howard',
  })
  @MaxLength(30)
  @MinLength(3)
  @Matches(/^[a-zA-Z ]+$/)
  @IsString()
  @IsOptional()
  middleName: string;

  @ApiProperty({
    example: 'Smith',
  })
  @MaxLength(30)
  @MinLength(3)
  @Matches(/^[a-zA-Z ]+$/)
  @IsString()
  lastName: string;

  @IsBoolean()
  isFake: boolean;
}
