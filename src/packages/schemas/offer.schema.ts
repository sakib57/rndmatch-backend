import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OfferDocument = Offer & Document;

@Schema()
export class Offer {
  @Prop()
  text: string;

  @Prop()
  quantity: number;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
