import { ApiProperty } from '@nestjs/swagger';

export class UpdateThreadDTO implements Readonly<UpdateThreadDTO> {
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
}
