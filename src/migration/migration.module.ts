import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DOSpaceServicerPovider } from 'src/files/helper/do-space.helper';
import {
  FilesService,
  LocalStorageService,
  AwsS3Service,
  DOSpaceService,
} from 'src/files/services';
import { UserProfileSchema, UserSchema } from 'src/users/schemas';
import { UserProfileService, UsersService } from 'src/users/services';
import { FakeUserController } from './controllers/fake-user.controller';
import { FakeUserService } from './services/fake-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'UserProfile', schema: UserProfileSchema },
    ]),
  ],
  providers: [
    FakeUserService,
    UsersService,
    UserProfileService,
    FilesService,
    LocalStorageService,
    AwsS3Service,
    DOSpaceService,
    DOSpaceServicerPovider,
  ],
  controllers: [FakeUserController],
})
export class MigrationModule {}
