import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop()
  startDate: number;

  @Prop()
  endDate: number;

  @Prop()
  url: string;

  @Prop()
  description: string;

  @Prop()
  contributors: string[];

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
