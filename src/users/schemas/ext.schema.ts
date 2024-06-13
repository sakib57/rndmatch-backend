import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MediaDocument, MediaSchema } from '../../common/schemas';

export type ExtDocument = Ext & Document;

@Schema()
export class Ext {
  @Prop({
    type: MediaSchema,
  })
  resume: MediaDocument;

  @Prop()
  resumeUTime: number;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const ExtSchema = SchemaFactory.createForClass(Ext);
