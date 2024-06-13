import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DOSpaceServicerPovider } from 'src/files/helper/do-space.helper';
import {
  AwsS3Service,
  DOSpaceService,
  FilesService,
  LocalStorageService,
} from '../files/services';
import { OrganizationSchema } from '../organization/schemas';
import { JobController } from './controllers';
import { JobSchema } from './schemas';
import { JobService } from './services';
import { HttpModule } from '@nestjs/axios';
import { UserProfileSchema, UserSchema } from "../users/schemas";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Job', schema: JobSchema },
      { name: 'Organization', schema: OrganizationSchema },
      { name: 'User', schema: UserSchema },
      { name: 'UserProfile', schema: UserProfileSchema },
    ]),
    HttpModule
  ],
  providers: [
    JobService,
    FilesService,
    LocalStorageService,
    AwsS3Service,
    DOSpaceService,
    DOSpaceServicerPovider,
  ],
  controllers: [JobController],
})
export class JobsModule {}
