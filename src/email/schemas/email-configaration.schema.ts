import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailConfigurationDocument = EmailConfiguration & Document;

@Schema()
export class EmailConfiguration {
  @Prop({
    required: true,
    default: 'zohomail',
  })
  mailServer: string;

  @Prop({
    required: true,
    default: process.env.EMAIL_HOST,
  })
  smtpHost: string;

  @Prop({
    required: true,
    default: process.env.EMAIL_PORT,
  })
  smtpPort: number;

  @Prop({ default: process.env.EMAIL_AUTH_USER, unique: true })
  defaultUser: string;

  @Prop({ default: process.env.EMAIL_AUTH_PASSWORD })
  defaultPassword: string;

  @Prop({ default: 'The iLafe Team' })
  defaultSignature: string;

  @Prop({
    required: true,
    default: false,
  })
  isDefault: boolean;

  @Prop({ default: Date.now() })
  cTime: number;

  @Prop()
  cBy: string;

  @Prop({ default: Date.now() })
  uTime: number;

  @Prop()
  uBy: string;
}

export const EmailConfigurationSchema =
  SchemaFactory.createForClass(EmailConfiguration);

EmailConfigurationSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    return {
      _id: ret._id,
      mailServer: ret.mailServer,
      smtpHost: ret.smtpHost,
      smtpPort: ret.smtpPort,
      defaultUser: ret.defaultUser,
      defaultPassword: ret.defaultPassword,
      defaultSignature: ret.isProvider,
      isDefault: ret.isDefault,
    };
  },
});
