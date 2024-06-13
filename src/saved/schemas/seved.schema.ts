import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { UserDocument } from '../../users/schemas';
import { JobDocument } from '../../jobs/schemas';

export type SavedDocument = Saved & Document;

@Schema()
export class Saved {
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
  isSaved: boolean;

  @Prop({ default: Date.now() })
  cTime: number;

  @Prop()
  cBy: string;

  @Prop({ default: Date.now() })
  uTime: number;

  @Prop()
  uBy: string;
}

export const SavedSchema = SchemaFactory.createForClass(Saved);

SavedSchema.index({ user: 1, job: 1 }, { unique: true });
