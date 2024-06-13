import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LanguageProficiency } from '../../common/mock/constant.mock';

export type LanguageDocument = Language & Document;

@Schema()
export class Language {
  @Prop({ required: true })
  language: string;

  @Prop({ default: LanguageProficiency.PROFESSIONAL })
  proficiency: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
