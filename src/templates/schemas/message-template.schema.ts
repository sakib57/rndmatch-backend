import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { UserDocument } from '../../users/schemas';

export type MessageTemplateDocument = MessageTemplate & Document;

@Schema()
export class MessageTemplate {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  message: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  user: UserDocument;

  @Prop({ default: true })
  isActive: boolean;

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

  @Prop({ default: Date.now() })
  dTime: number;

  @Prop()
  dBy: string;
}

export const MessageTemplateSchema =
  SchemaFactory.createForClass(MessageTemplate);

MessageTemplateSchema.set('toJSON', {
  transform: function (doc, ret) {
    return {
      _id: ret._id,
      title: ret.title,
      message: ret.message,
      isActive: ret.isActive,
      isDeleted: ret.isDeleted,
    };
  },
});
