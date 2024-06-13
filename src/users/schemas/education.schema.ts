import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EducationDocument = Education & Document;

@Schema()
export class Education {
  @Prop({ required: true })
  school: string;

  @Prop({ required: true })
  degree: string;

  @Prop()
  subject: string;

  @Prop()
  grade: number;

  @Prop()
  startDate: number;

  @Prop()
  endDate: number;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const EducationSchema = SchemaFactory.createForClass(Education);
