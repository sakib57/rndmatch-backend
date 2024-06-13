import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FaqsDocument = Faqs & Document;

@Schema()
export class Faqs {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;
}

export const FaqsSchema = SchemaFactory.createForClass(Faqs);
