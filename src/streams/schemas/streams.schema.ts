import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Position } from '../../positions/schemas';
import { Skills } from '../../skills/schemas';
import { SalaryDocument, SalarySchema } from '../../jobs/schemas/salary.schema';
import { LocationDocument, LocationSchema } from '../../common/schemas';
import { User } from '../../users/schemas';

export type StreamsDocument = Streams & Document;

@Schema()
export class Streams {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    immutable: true,
  })
  user: User;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Position',
    immutable: true,
    default: undefined,
  })
  position: Position[];

  @Prop()
  sortBy: string;

  @Prop()
  jobTitle: string;

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Skill',
    default: undefined,
  })
  primarySkills: Skills[];

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Skill',
    default: undefined,
  })
  allSkills: Skills[];

  @Prop({
    type: SalarySchema,
  })
  salaryRange: SalaryDocument;

  @Prop()
  workType: string[]; // remote, hybrid, on-site

  @Prop()
  experienceLevel: string[];

  @Prop()
  workEligibility: string[]; // remote, hybrid, on-site

  @Prop({
    type: LocationSchema,
  })
  currentLocation: LocationDocument;

  @Prop()
  underrepresentedGroups: string[]; // Diversity

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

export const StreamsSchema = SchemaFactory.createForClass(Streams);
