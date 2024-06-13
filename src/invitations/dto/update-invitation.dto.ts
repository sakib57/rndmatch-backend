import { ApiProperty } from '@nestjs/swagger';

export class UpdateInvitationDTO implements Readonly<UpdateInvitationDTO> {
  @ApiProperty()
  isAccepted: boolean;

  @ApiProperty()
  timezone: string;
}
