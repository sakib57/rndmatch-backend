import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Currency } from '../../common/mock/constant.mock';

export type SalaryDocument = Salary & Document;

@Schema()
export class Salary {
  @Prop()
  min: number;

  @Prop()
  max: number;

  @Prop({ enum: Currency, default: Currency.USD })
  currency: string;

  @Prop({ default: false })
  isShown: boolean;
}

export const SalarySchema = SchemaFactory.createForClass(Salary);
