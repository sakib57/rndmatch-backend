import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryDocument = Country & Document;
type ExtObjDocument = ExtObj & Document;

@Schema()
class ExtObj {
  @Prop({
    minlength: 2,
    maxlength: 10,
  })
  iso2code: string;

  @Prop()
  value: string;
}

const ExtObjSchema = SchemaFactory.createForClass(ExtObj);

@Schema({
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class Country {
  @Prop({
    minlength: 3,
    maxlength: 80,
    required: true,
  })
  name: string;

  @Prop({
    unique: true,
    minlength: 2,
    maxlength: 10,
    required: true,
  })
  iso2code: string;

  @Prop({
    type: ExtObjSchema,
  })
  region: ExtObjDocument;

  @Prop({
    type: ExtObjSchema,
  })
  incomeLevel: ExtObjDocument;

  @Prop()
  capitalCity: string;

  @Prop()
  lat: number;

  @Prop()
  lng: number;

  @Prop({
    default: undefined,
  })
  languages: [];

  @Prop({
    default: undefined,
  })
  timezones: [];

  @Prop()
  dialingCode: string;

  @Prop()
  currency: string;

  @Prop()
  continent: string;

  @Prop()
  flag: string;

  @Prop()
  flagEmoji: string;

  @Prop()
  emojiUnicode: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: Date.now() })
  cTime: number;

  @Prop()
  cBy: string;

  @Prop()
  uTime: number;

  @Prop()
  uBy: string;

  @Prop()
  dTime: number;

  @Prop()
  dBy: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);

CountrySchema.virtual('states', {
  ref: 'State',
  localField: '_id',
  foreignField: 'country',
  options: { sort: { name: 1 } },
  match: { isActive: true, isDeleted: false },
});

CountrySchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    return {
      _id: ret._id,
      name: ret.name,
      iso2code: ret.iso2code,
      region: ret.region,
      incomeLevel: ret.incomeLevel,
      capitalCity: ret.capitalCity,
      lat: ret.lat,
      lng: ret.lng,
      languages: ret.languages,
      timezones: ret.timezones,
      dialingCode: ret.dialingCode,
      currency: ret.currency,
      states: ret.states,
      continent: ret.continent,
      flag: ret.flag,
      flagEmoji: ret.flagEmoji,
      emojiUnicode: ret.emojiUnicode,
      isActive: ret.isActive,
      isDeleted: ret.isDeleted,
    };
  },
});
