import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { mockEmail } from '../../common/test-utils/mock';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../common/test-utils/db-handler';
import { EmailSchema } from '../schemas';
import { EmailService } from '../services';
import * as helper from '../../common/utils/helper';
import { HttpStatus } from '@nestjs/common';

describe('Email Service', () => {
  let emailService: EmailService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Email', schema: EmailSchema }]),
      ],
      providers: [EmailService],
    }).compile();

    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(emailService).toBeDefined();
  });

  it('Should create an email', async () => {
    const spyEncodeToken = jest.spyOn(helper, 'encodeToken');
    const email = mockEmail;
    const action = await emailService.create(email);
    mockEmail['_id'] = action._id;

    expect(spyEncodeToken).toBeCalled();
    expect(action).not.toBeNull();
    expect(action).not.toBeUndefined();
    expect(action.isSuccess).toBe(email.isSuccess);
    expect(action.emailUser).toBe(email.emailUser);
    expect(action.description).toBe(email.description);
    expect(action.subject).toBe(email.subject);
  });

  it('Should find an email by id', async () => {
    const emailDTO = mockEmail;
    const action = await emailService.findOne(mockEmail['_id']);

    expect(action).not.toBeNull();
    expect(action).not.toBeUndefined();
    expect(action.isSuccess).toBe(emailDTO.isSuccess);
    expect(action.emailUser).toBe(emailDTO.emailUser);
    expect(action.description).toBe(emailDTO.description);
    expect(action.subject).toBe(emailDTO.subject);
    expect(action.isSuccess).toBe(emailDTO.isSuccess);
    expect(action.emailUser).toBe(emailDTO.emailUser);
  });

  it('Should throw error if id not found', async () => {
    try {
      await emailService.findOne('5d8d2a8fddb8f584fc966c45');
    } catch (err: any) {
      expect(err).toBeInstanceOf(Error);
      expect(err.status).toBe(HttpStatus.NOT_FOUND);
      expect(err.message).toBe(`Email not found`);
    }
  });

  it('Should find all email', async () => {
    const query: any = {};
    const action = await emailService.findAll(query);

    expect(action).not.toBeNull();
    expect(action).not.toBeUndefined();
    expect(action?.data?.length).not.toBe(0);
  });

  it('Should find all distinct email', async () => {
    const action = await emailService.findDistinctEmails();

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
