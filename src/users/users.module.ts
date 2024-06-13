import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema, UserProfileSchema } from './schemas';
import { UsersService, UserProfileService } from './services';
import { UsersController, UsersProfileController } from './controllers';
import {
  FilesService,
  LocalStorageService,
  AwsS3Service,
  DOSpaceService,
} from '../files/services';
import { DOSpaceServicerPovider } from '../files/helper/do-space.helper';
// import {
//   EmailConfigurationSchema,
//   EmailSchema,
//   EmailTemplateSchema,
// } from '../email/schemas';
// import { EmailService } from '../email/services';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'UserProfile', schema: UserProfileSchema },
      // { name: 'EmailConfiguration', schema: EmailConfigurationSchema },
      // { name: 'Email', schema: EmailSchema },
      // { name: 'EmailTemplate', schema: EmailTemplateSchema },
    ]),
    JwtModule.register({
      secret: process.env.SECRET_KEY_JWT,
      signOptions: {
        expiresIn: 24 * 60 * 60 * 1000, // 1 days,
      },
    }),
  ],
  providers: [
    UsersService,
    UserProfileService,
    FilesService,
    LocalStorageService,
    AwsS3Service,
    DOSpaceService,
    DOSpaceServicerPovider,
    // EmailService,
  ],
  controllers: [UsersController, UsersProfileController],
})
export class UsersModule {}
