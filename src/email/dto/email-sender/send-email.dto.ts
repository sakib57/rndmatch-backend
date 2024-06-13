import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsMongoId,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SendEmailDTO implements Readonly<SendEmailDTO> {
  @ApiProperty({ required: true })
  recipient: string[];

  @ApiProperty()
  @IsMongoId()
  from: string;

  @ApiProperty()
  @IsBoolean()
  useCustomConfig: boolean;

  @ApiProperty()
  @IsEmail()
  defaultUser: string;

  @ApiProperty()
  defaultPassword: string;

  @ApiProperty()
  @MinLength(3)
  password: string;

  @ApiProperty({ required: true })
  @MaxLength(30)
  @MinLength(2)
  title: string;

  @ApiProperty({ required: true })
  @MaxLength(30)
  @MinLength(2)
  subject: string;

  @ApiProperty({ required: true })
  @MaxLength(350)
  @MinLength(10)
  body: string;

  @ApiProperty({ required: true })
  hasButton: boolean;

  @ApiProperty({ required: false })
  buttonText: string;

  @ApiProperty({ required: false })
  buttonUri: string;
}
