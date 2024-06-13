import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PriceDocument, PriceSchema } from './price.schema';

export type FootNoteDocument = FootNote & Document;

@Schema()
export class FootNote {
  @Prop()
  text: string;

  @Prop({
    type: [PriceSchema],
    default: undefined,
  })
  price: PriceDocument[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export const FootNoteSchema = SchemaFactory.createForClass(FootNote);
