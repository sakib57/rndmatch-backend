import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CertificateDocument = Certificate & Document;

@Schema()
export class Certificate {
  @Prop({ required: true })
  name: string;

  @Prop()
  issuingAuthority: string;

  @Prop()
  issuingDate: number;

  @Prop()
  credentialUrl: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CertificateSchema = SchemaFactory.createForClass(Certificate);
