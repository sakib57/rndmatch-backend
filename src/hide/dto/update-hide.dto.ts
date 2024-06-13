import { ApiProperty } from '@nestjs/swagger';

export class UpdateHideDTO implements Readonly<UpdateHideDTO> {
  @ApiProperty()
  isHide: boolean;

  @ApiProperty()
  timezone: string;
}
