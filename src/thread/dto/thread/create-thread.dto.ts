import { IsMongoId, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateThreadDTO implements Readonly<CreateThreadDTO> {
  @ApiProperty()
  @IsMongoId()
  job: string;

  @ApiProperty()
  @IsMongoId()
  userOne: string;

  @ApiProperty()
  @IsMongoId()
  userTwo: string;

  @ApiProperty()
  isUserOneRead: boolean;

  @ApiProperty()
  isUserTwoRead: boolean;

  @ApiProperty()
  isUserOneOnline: boolean;

  @ApiProperty()
  isUserTwoOnline: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  @IsString()
  timezone: string;
}
