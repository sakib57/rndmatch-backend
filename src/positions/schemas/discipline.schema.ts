import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DisciplineDocument = Discipline & Document;

@Schema()
export class Discipline {
  @Prop({
    unique: true,
    required: true,
  })
  name: string;

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

export const DisciplineSchema = SchemaFactory.createForClass(Discipline);

DisciplineSchema.set('toJSON', {
  transform: function (doc, ret) {
    return {
      _id: ret._id,
      name: ret.name,
      isActive: ret.isActive,
      isDeleted: ret.isDeleted,
    };
  },
});
