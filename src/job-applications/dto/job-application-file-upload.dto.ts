import { ApiProperty } from '@nestjs/swagger';

export class JobApplicationFileUploadDTO
  implements Readonly<JobApplicationFileUploadDTO>
{
  @ApiProperty({ type: 'string', format: 'binary' })
  resume: Express.Multer.File;
}
