import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserProfileDTO implements Readonly<CreateUserProfileDTO> {
  @ApiProperty()
  @MaxLength(30)
  @MinLength(3)
  @Matches(/^[a-zA-Z ]+$/)
  @IsString()
  firstName: string;

  @ApiProperty()
  @MaxLength(30)
  @MinLength(3)
  @Matches(/^[a-zA-Z ]+$/)
  @IsString()
  @IsOptional()
  middleName: string;

  @ApiProperty()
  @MaxLength(30)
  @MinLength(3)
  @Matches(/^[a-zA-Z ]+$/)
  @IsString()
  lastName: string;

  @ApiProperty()
  @MaxLength(150)
  @MinLength(3)
  @IsString()
  headline: string;
}
