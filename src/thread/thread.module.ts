import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThreadService, ChatService } from './services';
import { ThreadGateway } from './getways/thread.getway';
import { ThreadSchema, ChatSchema } from './schemas';
import { ChatController, ThreadController } from './controllers';
import { UserSchema } from '../users/schemas';
import {
  EmailConfigurationSchema,
  EmailTemplateSchema,
} from '../email/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Thread', schema: ThreadSchema },
      { name: 'Chat', schema: ChatSchema },
      { name: 'User', schema: UserSchema },
      { name: 'EmailConfiguration', schema: EmailConfigurationSchema },
      { name: 'EmailTemplate', schema: EmailTemplateSchema },
    ]),
  ],
  controllers: [ThreadController, ChatController],
  providers: [ThreadGateway, ThreadService, ChatService],
})
export class ThreadModule {}
