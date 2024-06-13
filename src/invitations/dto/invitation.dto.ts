import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class InvitationDTO implements Readonly<InvitationDTO> {
  @ApiProperty()
  @IsMongoId()
  inviteFrom: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  inviteTo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  tokenExpiresAt: number;

  @ApiProperty()
  @IsMongoId()
  candidateProfile: string;

  @ApiProperty()
  @IsMongoId()
  job: string;

  @ApiProperty()
  isAccepted: boolean;

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
