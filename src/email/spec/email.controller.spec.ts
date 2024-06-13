import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from '../services';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../common/test-utils/db-handler';
import { MongooseModule } from '@nestjs/mongoose';
import { AwsS3Service } from '../../aws/services';
import { EmailSchema } from '../schemas';
import { EmailController } from '../controllers/email.controller';

describe('EmailTemplate Controller', () => {
  let controller: EmailController;
  let service: EmailService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Email', schema: EmailSchema }]),
      ],
      controllers: [EmailController],
      providers: [EmailService, AwsS3Service],
    }).compile();

    service = module.get<EmailService>(EmailService);
    controller = module.get<EmailController>(EmailController);
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
