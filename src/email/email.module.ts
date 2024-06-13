// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module, Global } from '@nestjs/common';
import { EmailService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EmailConfigurationSchema,
  EmailTemplateSchema,
  EmailSchema,
} from './schemas';
import {
  EmailConfigurationController,
  EmailTemplateController,
} from './controllers';
import { EmailConfigurationService, EmailTemplateService } from './services';
import {
  FilesService,
  LocalStorageService,
  AwsS3Service,
  DOSpaceService,
} from '../files/services';
import { DOSpaceServicerPovider } from '../files/helper/do-space.helper';
import { DynamicMailer } from './services';
import { EmailController } from './controllers/email.controller';
import { EmailSenderController } from './controllers/email-sender.controller';
import { EmailSenderService } from './services/email-sender.service';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'EmailConfiguration', schema: EmailConfigurationSchema },
      { name: 'Email', schema: EmailSchema },
      { name: 'EmailTemplate', schema: EmailTemplateSchema },
    ]),
  ],
  controllers: [
    EmailConfigurationController,
    EmailTemplateController,
    EmailController,
    EmailSenderController,
  ],
  providers: [
    EmailSenderService,
    EmailService,
    DynamicMailer,
    EmailConfigurationService,
    EmailTemplateService,
    FilesService,
    LocalStorageService,
    AwsS3Service,
    DOSpaceService,
    DOSpaceServicerPovider,
  ],
  exports: [
    DynamicMailer,
    EmailTemplateService,
    EmailService,
    EmailConfigurationService,
  ], // 👈 export for DI
})
export class EmailModule {}
