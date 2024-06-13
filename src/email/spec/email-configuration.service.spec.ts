import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { mockUser } from '../../common/test-utils/mock';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../common/test-utils/db-handler';
import { EmailConfigurationSchema } from '../schemas';
import { DynamicMailer, EmailConfigurationService } from '../services';
import * as helper from '../../common/utils/helper';
import { mockEmailConfiguration } from '../../common/test-utils/mock/email-configuration.mock';
import { UserProfileService, UsersService } from '../../users/services';
import { HttpStatus } from '@nestjs/common';
import { UpdateEmailConfigurationDTO } from '../dto';
import { AwsS3Service } from '../../aws/services';
import { UserSchema } from '../../users/schemas/user.schema';
import { UserInvitationService } from '../../user-invitation/services/user-invitation.service';
import { UserProfileSchema } from '../../users/schemas/user-profile.schema';
import { InvitationSchema } from '../../user-invitation/schemas/user-invitation.schema';

describe('Email Configuration', () => {
  let emailConfigurationService: EmailConfigurationService;
  let userService: UsersService;

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
      providers: [
        EmailConfigurationService,
        AwsS3Service,
        UsersService,
        UserProfileService,
        UserInvitationService,
      ],
    }).compile();

    emailConfigurationService = module.get<EmailConfigurationService>(
      EmailConfigurationService,
    );
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(emailConfigurationService).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('Should create an email configuration', async () => {
    const spyEncodeToken = jest.spyOn(helper, 'encodeToken');
    const emailConfiguration = mockEmailConfiguration;
    const mUser: any = mockUser;
    const user = await userService.register(mUser);
    const action = await emailConfigurationService.create(
      user,
      emailConfiguration,
    );
    mockEmailConfiguration['_id'] = action._id;

    expect(spyEncodeToken).toBeCalled();
    expect(action).not.toBeNull();
    expect(action).not.toBeUndefined();
    expect(action.defaultUser).toBe(
      emailConfiguration.defaultUser?.toLowerCase(),
    );
    expect(action.mailServer).toBe(emailConfiguration.mailServer);
    expect(action.smtpHost).toBe(emailConfiguration.smtpHost);
    expect(action.smtpPort).toBe(emailConfiguration.smtpPort);
  });

  it('Should not register new configuration with same defaultUser', async () => {
    const emailConfiguration = mockEmailConfiguration;
    try {
      const mUser: any = mockUser;
      mUser.email = 'temp@ilafe.com';
      const user = await userService.register(mUser);
      await emailConfigurationService.create(user, emailConfiguration);
    } catch (err: any) {
      expect(err).toBeInstanceOf(Error);
      expect(err.status).toBe(HttpStatus.NOT_ACCEPTABLE);
      expect(err.message).toBe(
        `${emailConfiguration.defaultUser} already exist`,
      );
    }
  });

  it('Should update a configuration by id', async () => {
    const spyEncodeToken = jest.spyOn(helper, 'encodeToken');
    const updateEmailConfiguration = new UpdateEmailConfigurationDTO();
    updateEmailConfiguration.mailServer = 'applemail';
    updateEmailConfiguration.defaultPassword = 'Gram222!';

    const mUser: any = mockUser;
    mUser.email = 'temp2@ilafe.com';
    const user = await userService.register(mUser);
    const action = await emailConfigurationService.update(
      user,
      mockEmailConfiguration['_id'],
      updateEmailConfiguration,
    );

    expect(spyEncodeToken).toBeCalled();
    expect(action).not.toBeNull();
    expect(action).not.toBeUndefined();
    expect(action.mailServer).toBe(updateEmailConfiguration.mailServer);
  });

  it('Should find a configuration by id', async () => {
    const action = await emailConfigurationService.findOne(
      mockEmailConfiguration['_id'],
      null,
    );

    expect(action).not.toBeNull();
    expect(action).not.toBeUndefined();
  });

  it('Should throw error if configuration does not exist', async () => {
    const _id = '5d8d2a8fddb8f584fc966c45';
    try {
      await emailConfigurationService.findOne(_id, null);
    } catch (err: any) {
      expect(err).toBeInstanceOf(Error);
      expect(err.status).toBe(HttpStatus.NOT_FOUND);
      expect(err.message).toBe(`Email configuration not found`);
    }
  });

  it('Should throw error if id and query does not pass', async () => {
    try {
      await emailConfigurationService.findOne(null, null);
    } catch (err: any) {
      expect(err).toBeInstanceOf(Error);
      expect(err.status).toBe(HttpStatus.BAD_REQUEST);
      expect(err.message).toBe(`id and query was not passed`);
    }
  });

  it('Should find all email configurations', async () => {
    const query: any = {};
    const action = await emailConfigurationService.findAll(query);
    expect(action).not.toBeNull();
    expect(action).not.toBeUndefined();
    expect(action?.length).not.toBe(0);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
