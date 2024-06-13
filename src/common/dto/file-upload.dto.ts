import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDTO implements Readonly<FileUploadDTO> {
  @ApiProperty({ type: 'string', format: 'binary' })
  logo: Express.Multer.File;

  @ApiProperty({ type: 'string', format: 'binary' })
  banner: Express.Multer.File;

  @ApiProperty({ type: 'string', format: 'binary' })
  pictures: Express.Multer.File[];

  @ApiProperty({ type: 'string', format: 'binary' })
  videos: Express.Multer.File[];
}
