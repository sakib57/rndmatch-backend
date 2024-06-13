import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MediaDocument, MediaSchema } from '../../common/schemas';

export type EmailDocument = Email & Document;

@Schema()
export class Email {
  @Prop({ default: process.env.EMAIL_AUTH_USER })
  emailUser: string;

  @Prop({ default: process.env.EMAIL_AUTH_PASSWORD })
  emailPassword: string;

  @Prop({ required: true })
  to: string[];

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: MediaSchema,
  })
  signatureLogo: MediaDocument;

  @Prop({
    type: [MediaSchema],
    default: undefined,
  })
  attachments: MediaDocument[];

  @Prop({ default: 'The rndmatch Team' })
  signature: string;

  @Prop({ required: true })
  isSuccess: boolean;

  @Prop({ default: Date.now() })
  cTime: number;

  @Prop()
  cBy: string;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
