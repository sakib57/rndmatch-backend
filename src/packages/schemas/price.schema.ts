import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Currency } from '../../common/mock/constant.mock';

export type PriceDocument = Price & Document;

@Schema()
export class Price {
  @Prop()
  amount: number;

  @Prop({ default: Currency.USD })
  currency: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
