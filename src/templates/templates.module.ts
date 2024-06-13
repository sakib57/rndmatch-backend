import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageTemplatesController } from './controllers/message-templates.controller';
import { MessageTemplateSchema } from './schemas/message-template.schema';
import { MessageTemplatesService } from './services/message-templates.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MessageTemplate', schema: MessageTemplateSchema },
    ]),
  ],
  providers: [MessageTemplatesService],
  controllers: [MessageTemplatesController],
})
export class TemplatesModule {}
