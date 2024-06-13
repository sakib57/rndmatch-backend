import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MediaDocument, MediaSchema } from '../../common/schemas';

export type TestimonialDocument = Testimonial & Document;

@Schema()
export class Testimonial {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  testimonial: string;

  @Prop({
    type: MediaSchema,
  })
  video: MediaDocument;

  @Prop({
    type: MediaSchema,
  })
  picture: MediaDocument;

  @Prop({ default: false })
  isDeleted: boolean;
}
export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
