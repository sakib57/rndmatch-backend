import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateInvitationDTO implements Readonly<CreateInvitationDTO> {
  @ApiProperty()
  @IsMongoId()
  inviteFrom: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  inviteTo: string;

  @ApiProperty()
  @IsMongoId()
  candidateProfile: string;

  @ApiProperty()
  @IsMongoId()
  job: string;

  @ApiProperty()
  timezone: string;
}
