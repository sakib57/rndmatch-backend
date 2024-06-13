import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ThreadDTO implements Readonly<ThreadDTO> {
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
  isDeleted: boolean;

  cTime: number;
  cBy: string;
  uTime: number;
  uBy: string;
}
