import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PublicationDocument = Publication & Document;

@Schema()
export class Publication {
  @Prop({ required: true })
  title: string;

  @Prop()
  publisher: string;

  @Prop()
  publishingDate: number;

  @Prop()
  url: string;

  @Prop()
  description: string;

  @Prop()
  authors: string[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export const PublicationSchema = SchemaFactory.createForClass(Publication);
