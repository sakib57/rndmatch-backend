import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DOSpaceServicerPovider } from '../files/helper/do-space.helper';
import {
  FilesService,
  LocalStorageService,
  AwsS3Service,
  DOSpaceService,
} from 'src/files/services';
import { JobApplicationController } from './controllers';
import { JobApplicationSchema } from './schemas/job-application.schema';
import { JobApplicationService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'JobApplication', schema: JobApplicationSchema },
    ]),
  ],
  providers: [
    JobApplicationService,
    FilesService,
    LocalStorageService,
    AwsS3Service,
    DOSpaceService,
    DOSpaceServicerPovider,
  ],
  controllers: [JobApplicationController],
})
export class JobApplicationsModule {}
