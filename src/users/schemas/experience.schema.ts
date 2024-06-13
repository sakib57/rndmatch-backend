import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LocationDocument, LocationSchema } from '../../common/schemas';

export type ExperienceDocument = Experience & Document;

@Schema()
export class Experience {
  @Prop({ required: true })
  designation: string;

  @Prop()
  employmentType: string;

  //employer
  @Prop({ required: true })
  organization: string;

  @Prop()
  industry: string;

  @Prop()
  headline: string;

  @Prop()
  description: string;

  @Prop()
  roles: string;

  @Prop({
    type: LocationSchema,
  })
  location: LocationDocument;

  @Prop()
  startDate: number;

  @Prop()
  endDate: number;

  @Prop()
  isStillWorking: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
