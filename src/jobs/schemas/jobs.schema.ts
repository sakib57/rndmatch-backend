import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from '../../users/schemas';
import { Organization } from '../../organization/schemas';
import { Salary } from './salary.schema';
import { EmploymentType, Status } from '../../common/mock/constant.mock';
import { Location, MediaDocument, MediaSchema } from '../../common/schemas';
import { Skills } from '../../skills/schemas';
import {
  PositionTitleDocument,
  PositionTitleSchema,
} from './position-title.schema';
import { UserDocument } from '../../users/schemas';

export type JobDocument = Job & Document;

@Schema()
export class Job {
  @Prop({
    type: [PositionTitleSchema],
    default: undefined,
    max: 3,
  })
  positionTitle: PositionTitleDocument[];

  @Prop({ enum: Status, default: Status.DRAFT })
  status: string;

  @Prop({ required: true, minlength: 1, maxlength: 100 })
  title: string;

  @Prop({
    unique: true,
    minlength: 3,
    maxlength: 10,
  })
  slug: string;

  @Prop({
    type: MediaSchema,
  })
  jobPic: MediaDocument;

  @Prop()
  internalLevels: string[];

  @Prop()
  description: string;

  @Prop({
    type: MediaSchema,
  })
  positionVideo: MediaDocument;

  @Prop()
  interviewProcess: string;

  @Prop({ default: EmploymentType.FULL_TIME })
  employmentType: string;

  @Prop()
  workTypes: string[];

  @Prop()
  seniorityLevels: string[];

  @Prop()
  industry: string;

  @Prop(Location)
  location: Location;

  @Prop()
  education: string;

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
  secondarySkills: Skills[];

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Skill',
    default: undefined,
  })
  techStacks: Skills[];

  @Prop(Salary)
  salaryRange: Salary;

  @Prop()
  deadline: number;

  @Prop({ default: false })
  hasSubscription: boolean;

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'User',
  })
  hiringTeam: User[];

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Organization',
  })
  organization: Organization;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  postBy: UserDocument;

  @Prop({ default: false })
  doesProvideVisaSponsorship: boolean;

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

export const JobSchema = SchemaFactory.createForClass(Job);
