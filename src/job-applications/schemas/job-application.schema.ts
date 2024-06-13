import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from '../../users/schemas';
import { Job } from '../../jobs/schemas';
import { ScreeningStatus } from '../../common/mock/constant.mock';
import { MediaDocument, MediaSchema } from '../../common/schemas';

export type JobApplicationDocument = JobApplication & Document;

@Schema()
export class JobApplication {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Job',
    required: true,
    immutable: true,
  })
  job: Job;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  jobSeeker: User;

  @Prop({ default: ScreeningStatus.HOLD })
  status: string;

  @Prop({ default: Date.now() })
  applicationDate: number;

  @Prop()
  interviewDate: number;

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'User',
  })
  hiringTeam: User[];

  @Prop({
    type: MediaSchema,
  })
  resume: MediaDocument;

  @Prop()
  isRequiredVisaSponsorship: boolean;

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

export const JobApplicationSchema =
  SchemaFactory.createForClass(JobApplication);
