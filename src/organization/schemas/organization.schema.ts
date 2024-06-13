import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { TestimonialDocument, TestimonialSchema } from './testimonial.schema';
import { FaqsDocument, FaqsSchema } from './faq.schema';
import {
  LocationDocument,
  LocationSchema,
  SocialDocument,
  SocialSchema,
} from '../../common/schemas';
import { MediaDocument, MediaSchema } from '../../common/schemas';
import { OrgMobileDocument, OrgMobileSchema } from './org-mobile.schema';

export type OrganizationDocument = Organization & Document;

@Schema({
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class Organization {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop({
    type: LocationSchema,
  })
  location: LocationDocument;

  @Prop()
  yearFounded: number;

  @Prop()
  orgSize: string;

  @Prop({ required: true })
  industryType: string;

  @Prop()
  fieldsOfWork: string[];

  @Prop({ unique: true, sparse: true })
  website: string;

  @Prop({
    type: OrgMobileSchema,
    sparse: true,
  })
  mobile: OrgMobileDocument;

  @Prop({ unique: true, sparse: true })
  email: string;

  @Prop()
  tagline: string;

  @Prop({
    type: MediaSchema,
  })
  logo: MediaDocument;

  @Prop({
    type: MediaSchema,
  })
  banner: MediaDocument;

  @Prop({
    type: [MediaSchema],
    default: undefined,
  })
  videos: MediaDocument[];

  @Prop({
    type: [MediaSchema],
    default: undefined,
  })
  pictures: MediaDocument[];

  @Prop({
    type: [SocialSchema],
    default: undefined,
  })
  socials: SocialDocument[];

  @Prop({
    type: [TestimonialSchema],
    default: undefined,
  })
  testimonials: TestimonialDocument[];

  @Prop({
    type: [FaqsSchema],
    default: undefined,
  })
  faqs: FaqsDocument[];

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Organization',
  })
  parentOrg: Organization;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isVerified: boolean;

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

export const OrganizationSchema = SchemaFactory.createForClass(Organization);

OrganizationSchema.virtual('members', {
  ref: 'Member',
  localField: '_id',
  foreignField: 'organization',
});

OrganizationSchema.set('toJSON', {
  transform: function (doc, ret) {
    return {
      _id: ret._id,
      name: ret.name,
      slug: ret.slug,
      description: ret.description,
      location: ret.location,
      yearFounded: ret.yearFounded,
      orgSize: ret.orgSize,
      industryType: ret.industryType,
      fieldsOfWork: ret.fieldsOfWork,
      website: ret.website,
      mobile: ret.mobile,
      email: ret.email,
      tagline: ret.tagline,
      logo: ret.logo,
      banner: ret.banner,
      videos: ret.videos,
      pictures: ret.pictures,
      socials: ret.socials,
      testimonials: ret.testimonials,
      faqs: ret.faqs,
      parentOrg: ret.parentOrg,
      isActive: ret.isActive,
      isVerified: ret.isVerified,
      isDeleted: ret.isDeleted,
    };
  },
});
