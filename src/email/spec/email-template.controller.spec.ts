import { Test, TestingModule } from '@nestjs/testing';
import { EmailTemplateController } from '../controllers';
import { EmailTemplateService } from '../services';
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
import { EmailConfigurationSchema, EmailTemplateSchema } from '../schemas';
import { UserProfileService, UsersService } from '../../users/services';

describe('EmailTemplate Controller', () => {
  let controller: EmailTemplateController;
  let service: EmailTemplateService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'EmailTemplate', schema: EmailTemplateSchema },
          { name: 'User', schema: UserSchema },
          { name: 'UserProfile', schema: UserProfileSchema },
          { name: 'Invitation', schema: InvitationSchema },
        ]),
      ],
      controllers: [EmailTemplateController],
      providers: [
        EmailTemplateService,
        AwsS3Service,
        UsersService,
        UserProfileService,
        UserInvitationService,
      ],
    }).compile();

    service = module.get<EmailTemplateService>(EmailTemplateService);
    controller = module.get<EmailTemplateController>(EmailTemplateController);
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
