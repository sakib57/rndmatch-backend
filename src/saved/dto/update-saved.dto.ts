import { ApiProperty } from '@nestjs/swagger';

export class UpdateSavedDTO implements Readonly<UpdateSavedDTO> {
  @ApiProperty()
  isSaved: boolean;

  @ApiProperty()
  timezone: string;
}
