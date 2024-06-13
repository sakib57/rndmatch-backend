import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Discipline, Field, Position } from '../../positions/schemas';
import { Skills } from '../../skills/schemas';

export type PreferenceDocument = Preference & Document;

@Schema()
export class Preference {
  @Prop()
  salaryExpectation: number;

  @Prop()
  currency: string;

  @Prop()
  seniorityLevel: string[];

  @Prop()
  workLocation: string[];

  @Prop()
  workType: string[]; // remote, hybrid, on-site

  @Prop()
  workingTimezone: string[];

  @Prop()
  employmentType: string[];

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Skill',
    default: undefined,
  })
  preferredSkills: Skills[];

  @Prop()
  industries: string[];

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Position',
    default: undefined,
  })
  positions: Position[];

  @Prop()
  disciplines: Discipline[];

  @Prop()
  fields: Field[];

  @Prop()
  companySize: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const PreferenceSchema = SchemaFactory.createForClass(Preference);
