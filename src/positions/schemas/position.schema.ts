import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Discipline } from './discipline.schema';
import { Field } from './field.schema';
import { PositionType } from '../../common/mock/constant.mock';

export type PositionDocument = Position & Document;

@Schema()
export class Position {
  @Prop({
    unique: true,
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    enum: PositionType,
  })
  type: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Discipline',
    required: true,
  })
  discipline: Discipline;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Field',
  })
  field: Field;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: Date.now() })
  cTime: number;

  @Prop()
  cBy: string;

  @Prop({ default: Date.now() })
  uTime: number;

  @Prop()
  uBy: string;

  @Prop({ default: Date.now() })
  dTime: number;

  @Prop()
  dBy: string;
}

export const PositionSchema = SchemaFactory.createForClass(Position);

PositionSchema.set('toJSON', {
  transform: function (doc, ret) {
    return {
      _id: ret._id,
      name: ret.name,
      type: ret.type,
      field: ret.field,
      discipline: ret.discipline,
      isActive: ret.isActive,
      isDeleted: ret.isDeleted,
    };
  },
});
