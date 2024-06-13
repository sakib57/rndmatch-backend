import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PresentationDocument = Presentation & Document;

@Schema()
export class Presentation {
  @Prop({ required: true })
  title: string;

  @Prop()
  presentedAt: string;

  @Prop()
  presentationDate: number;

  @Prop()
  url: string;

  @Prop()
  description: string;

  @Prop()
  presenters: string[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export const PresentationSchema = SchemaFactory.createForClass(Presentation);
