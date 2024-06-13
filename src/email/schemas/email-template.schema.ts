import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MediaDocument, MediaSchema } from '../../common/schemas';

export type EmailTemplateDocument = EmailTemplate & Document;
@Schema()
export class EmailTemplate {
  @Prop({ default: process.env.EMAIL_AUTH_USER })
  emailUser: string;

  @Prop({ default: process.env.EMAIL_AUTH_PASSWORD })
  emailPassword: string;

  @Prop({ unique: true, required: true })
  contentType: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: MediaSchema,
  })
  signatureLogo: MediaDocument;

  @Prop({ default: 'The iLafe Team' })
  signature: string;

  @Prop({ default: Date.now() })
  cTime: number;

  @Prop()
  cBy: string;

  @Prop({ default: Date.now() })
  uTime: number;

  @Prop()
  uBy: string;
}

export const EmailTemplateSchema = SchemaFactory.createForClass(EmailTemplate);
