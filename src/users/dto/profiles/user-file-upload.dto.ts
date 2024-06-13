import { ApiProperty } from '@nestjs/swagger';

export class UserFileUploadDTO implements Readonly<UserFileUploadDTO> {
  @ApiProperty({ type: 'string', format: 'binary' })
  profilePic: Express.Multer.File;

  @ApiProperty({ type: 'string', format: 'binary' })
  coverPic: Express.Multer.File;

  @ApiProperty({ type: 'string', format: 'binary' })
  resume: Express.Multer.File;
}
