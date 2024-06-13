import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationSchema } from './schemas';
import { MemberSchema } from './schemas/member.schema';
import { UserSchema } from '../users/schemas';
import { MemberService, OrganizationService } from './services';
import { MemberController, OrganizationController } from './controllers';
import {
  AwsS3Service,
  DOSpaceService,
  FilesService,
  LocalStorageService,
} from 'src/files/services';
import { DOSpaceServicerPovider } from '../files/helper/do-space.helper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Organization', schema: OrganizationSchema },
      { name: 'Member', schema: MemberSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [
    OrganizationService,
    MemberService,
    FilesService,
    LocalStorageService,
    AwsS3Service,
    DOSpaceService,
    DOSpaceServicerPovider,
  ],
  controllers: [OrganizationController, MemberController],
})
export class OrganizationModule {}
