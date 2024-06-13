import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { UserDocument } from '../../users/schemas';
import { JobDocument } from '../../jobs/schemas';

export type HideDocument = Hide & Document;

@Schema()
export class Hide {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  user: UserDocument;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Job',
    required: true,
  })
  job: JobDocument;

  @Prop()
  isHide: boolean;

  @Prop({ default: Date.now() })
  cTime: number;

  @Prop()
  cBy: string;

  @Prop({ default: Date.now() })
  uTime: number;

  @Prop()
  uBy: string;
}

export const HideSchema = SchemaFactory.createForClass(Hide);

HideSchema.index({ user: 1, job: 1 }, { unique: true });
