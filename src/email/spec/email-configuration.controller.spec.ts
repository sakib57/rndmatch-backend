import { Test, TestingModule } from '@nestjs/testing';
import { EmailConfigurationController } from '../controllers';
import { EmailConfigurationService, EmailTemplateService } from '../services';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../common/test-utils/db-handler';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileSchema } from '../../users/schemas/user-profile.schema';
import { UserSchema } from '../../users/schemas/user.schema';
import { InvitationSchema } from '../../user-invitation/schemas/user-invitation.schema';
import { AwsS3Service } from '../../aws/services';
import { UserInvitationService } from '../../user-invitation/services/user-invitation.service';
import { EmailConfigurationSchema } from '../schemas';
import { UserProfileService, UsersService } from '../../users/services';

describe('EmailConfiguration Controller', () => {
  let controller: EmailConfigurationController;
  let service: EmailConfigurationService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'EmailConfiguration', schema: EmailConfigurationSchema },
          { name: 'User', schema: UserSchema },
          { name: 'UserProfile', schema: UserProfileSchema },
          { name: 'Invitation', schema: InvitationSchema },
        ]),
      ],
      controllers: [EmailConfigurationController],
      providers: [
        EmailConfigurationService,
        AwsS3Service,
        UsersService,
        UserProfileService,
        UserInvitationService,
      ],
    }).compile();

    service = module.get<EmailConfigurationService>(EmailConfigurationService);
    controller = module.get<EmailConfigurationController>(
      EmailConfigurationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
