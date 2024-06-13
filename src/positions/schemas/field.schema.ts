import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Discipline } from './discipline.schema';

export type FieldDocument = Field & Document;

@Schema()
export class Field {
  @Prop({
    unique: true,
    required: true,
  })
  name: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Discipline',
    required: true,
    immutable: true,
  })
  discipline: Discipline;

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

export const FieldSchema = SchemaFactory.createForClass(Field);

FieldSchema.set('toJSON', {
  transform: function (doc, ret) {
    return {
      _id: ret._id,
      name: ret.name,
      discipline: ret.discipline,
      isActive: ret.isActive,
      isDeleted: ret.isDeleted,
    };
  },
});
