import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { JobDocument } from '../../jobs/schemas';
import { UserDocument } from '../../users/schemas';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
  })
  sender: UserDocument;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  receiver: UserDocument;

  // Generally not necessary. However, we keep this field if it will require in the future
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Job',
  })
  job: JobDocument;

  @Prop()
  subject: string;

  @Prop()
  text: string;

  @Prop()
  activityType: string;

  @Prop()
  activityName: string;

  @Prop({
    type: SchemaTypes.Mixed,
  })
  actionInfo: Record<string, unknown>;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: Date.now() })
  cTime: number;

  @Prop()
  cBy: string;

  @Prop({ default: Date.now() })
  uTime: number;

  @Prop()
  uBy: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
