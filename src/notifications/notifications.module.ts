import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './controllers/notifications.controller';
import { NotificationSchema } from './schemas/notification.schema';
import { NotificationsService } from './services/notifications.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Notification', schema: NotificationSchema },
    ]),
  ],
  providers: [NotificationsService],
  controllers: [NotificationController],
})
export class NotificationsModule {}
