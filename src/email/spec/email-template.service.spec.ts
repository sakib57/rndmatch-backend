import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { mockUser } from '../../common/test-utils/mock';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../common/test-utils/db-handler';
import { EmailTemplateSchema } from '../schemas';
import { EmailTemplateService } from '../services';
import * as helper from '../../common/utils/helper';
import { HttpStatus } from '@nestjs/common';
import { mockEmailTemplate } from '../../common/test-utils/mock/email-template.mock';
import { UserProfileService, UsersService } from '../../users/services';
import { AwsS3Service } from '../../aws/services';
import { UserSchema } from '../../users/schemas/user.schema';
import { UserInvitationService } from '../../user-invitation/services/user-invitation.service';
import { UserProfileSchema } from '../../users/schemas/user-profile.schema';
import { InvitationSchema } from '../../user-invitation/schemas/user-invitation.schema';
import { EmailContentType } from '../../common/mock/constant.mock';

describe('Email Service', () => {
  let emailTemplateService: EmailTemplateService;
  let userService: UsersService;

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
      providers: [
        EmailTemplateService,
        AwsS3Service,
        UsersService,
        UserProfileService,
        UserInvitationService,
      ],
    }).compile();

    emailTemplateService =
      module.get<EmailTemplateService>(EmailTemplateService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(emailTemplateService).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('Should create an template', async () => {
    const spyEncodeToken = jest.spyOn(helper, 'encodeToken');
    const emailTemplate: any = mockEmailTemplate;
    const mUser: any = mockUser;
    const user = await userService.register(mUser);
    const action = await emailTemplateService.create(user, emailTemplate);
    mockEmailTemplate['_id'] = action._id;

    expect(spyEncodeToken).toBeCalled();
    expect(action).not.toBeNull();
    expect(action).not.toBeUndefined();
    expect(action.emailUser).toBe(emailTemplate.emailUser);
    expect(action.signature).toBe(emailTemplate.signature);
    expect(action.subject).toBe(emailTemplate.subject);
    expect(action.description).toBe(emailTemplate.description);
  });

  it('Should throw error if template is registered with same content type', async () => {
    const emailTemplate: any = mockEmailTemplate;
    try {
      const mUser: any = mockUser;
      mUser.email = 'ilafe@ilafe.com';
      const user = await userService.register(mUser);
      await emailTemplateService.create(user, emailTemplate);
    } catch (err: any) {
      expect(err).toBeInstanceOf(Error);
      expect(err.status).toBe(HttpStatus.NOT_ACCEPTABLE);
      expect(err.message).toBe(`${emailTemplate.contentType} already exist`);
    }
  });

  it('Should find an email template by id', async () => {
    const emailTemplate = mockEmailTemplate;
    const action = await emailTemplateService.findOne(
      emailTemplate.contentType as EmailContentType,
    );

    expect(action).not.toBeNull();
    expect(action).not.toBeUndefined();
    expect(action.emailUser).toBe(emailTemplate.emailUser);
    expect(action.subject).toBe(emailTemplate.subject);
    expect(action.description).toBe(emailTemplate.description);
  });

  it('Should throw error if id of email template not found', async () => {
    const contentType = EmailContentType.NEW_MESSAGE;
    try {
      await emailTemplateService.findOne(contentType);
    } catch (err: any) {
      expect(err).toBeInstanceOf(Error);
      expect(err.status).toBe(HttpStatus.NOT_FOUND);
      expect(err.message).toBe(
        `Email template with ${contentType} does not exist`,
      );
    }
  });

  it('Should find all email template', async () => {
    const query: any = {};
    const action = await emailTemplateService.findAll(query);

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
