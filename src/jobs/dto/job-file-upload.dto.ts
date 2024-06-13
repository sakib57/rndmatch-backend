import { ApiProperty } from '@nestjs/swagger';

export class JobFileUploadDTO implements Readonly<JobFileUploadDTO> {
  @ApiProperty({ type: 'string', format: 'binary' })
  jobPic: Express.Multer.File;
}
