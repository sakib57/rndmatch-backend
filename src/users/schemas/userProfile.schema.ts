import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from './user.schema';
import { EducationDocument, EducationSchema } from './education.schema';
import { CertificateDocument, CertificateSchema } from './certificate.schema';
import { ExperienceDocument, ExperienceSchema } from './experience.schema';
import { ExtDocument, ExtSchema } from './ext.schema';
import { SocialDocument, SocialSchema } from '../../common/schemas';
import { LocationDocument, LocationSchema } from '../../common/schemas';
import { MobileDocument, MobileSchema } from '../../common/schemas';
import { MediaDocument, MediaSchema } from '../../common/schemas';
import { PublicationDocument, PublicationSchema } from './publication.schema';
import { ProjectDocument, ProjectSchema } from './project.schema';
import { LanguageDocument, LanguageSchema } from './language.schema';
import { PreferenceDocument, PreferenceSchema } from './preference.schema';
import { Skills } from 'src/skills/schemas';
import {
  PresentationDocument,
  PresentationSchema,
} from './presentation.schema';

export type UserProfileDocument = UserProfile & Document;

@Schema()
export class UserProfile {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
    immutable: true,
  })
  user: User;

  @Prop({
    unique: true,
    minlength: 3,
    maxlength: 10,
  })
  slug: string;

  @Prop({
    minlength: 3,
    maxlength: 30,
  })
  firstName: string;

  @Prop({
    minlength: 3,
    maxlength: 30,
    required: false,
  })
  middleName: string;

  @Prop({
    minlength: 3,
    maxlength: 30,
  })
  lastName: string;

  @Prop({
    minlength: 3,
    maxlength: 150,
  })
  headline: string;

  @Prop({
    minlength: 0,
    maxlength: 5000,
  })
  summary: string;

  @Prop()
  dob: number;

  @Prop()
  gender: string;

  @Prop()
  ethnicity: string;

  @Prop()
  diversity: string;

  @Prop()
  yearsOfExperience: number;

  @Prop()
  yearsAtThisOrg: number;

  @Prop()
  lifeAtThisOrg: string;

  @Prop({
    type: MobileSchema,
  })
  mobile: MobileDocument;

  @Prop({
    type: LocationSchema,
  })
  location: LocationDocument;

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Skill',
    default: undefined,
  })
  skills: Skills[];

  @Prop({
    type: [EducationSchema],
    default: undefined,
  })
  educations: EducationDocument[];

  @Prop({
    type: [CertificateSchema],
    default: undefined,
  })
  certificates: CertificateDocument[];

  @Prop({
    type: [ExperienceSchema],
    default: undefined,
  })
  experiences: ExperienceDocument[];

  @Prop({
    type: [PublicationSchema],
    default: undefined,
  })
  publications: PublicationDocument[];

  @Prop({
    type: [PresentationSchema],
    default: undefined,
  })
  presentations: PresentationDocument[];

  @Prop({
    type: [ProjectSchema],
    default: undefined,
  })
  projects: ProjectDocument[];

  @Prop({
    type: [LanguageSchema],
    default: undefined,
  })
  languages: LanguageDocument[];

  @Prop({
    type: [SocialSchema],
    default: undefined,
  })
  socials: SocialDocument[];

  @Prop({
    type: ExtSchema,
  })
  ext: ExtDocument;

  @Prop({
    type: PreferenceSchema,
  })
  preference: PreferenceDocument;

  @Prop({
    type: MediaSchema,
  })
  profilePic: MediaDocument;

  @Prop({
    type: MediaSchema,
  })
  coverPic: MediaDocument;

  @Prop({ default: true })
  isPublicProfile: boolean;

  @Prop({ default: false })
  isProfileCreated: boolean;

  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ default: 0 })
  followerCount: number;

  @Prop({ default: 0 })
  followingCount: number;

  @Prop({ default: 0 })
  profilePercentage: number;

  @Prop({ default: true })
  isOpenForOpportunities: boolean;

  @Prop({ default: true })
  isOpenForHiring: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: true })
  isPublic: boolean;

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

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);

UserProfileSchema.set('toJSON', {
  transform: function (doc, ret) {
    return {
      _id: ret._id,
      slug: ret.slug,
      user: ret.user,
      firstName: ret.firstName,
      middleName: ret.middleName,
      lastName: ret.lastName,
      headline: ret.headline,
      summary: ret.summary,
      dob: ret.dob,
      gender: ret.gender,
      ethnicity: ret.ethnicity,
      diversity: ret.diversity,
      mobile: ret.mobile,
      location: ret.location,
      skills: ret.skills,
      educations: ret.educations,
      certificates: ret.certificates,
      experiences: ret.experiences,
      publications: ret.publications,
      presentations: ret.presentations,
      projects: ret.projects,
      languages: ret.languages,
      socials: ret.socials,
      ext: ret.ext,
      preference: ret.preference,
      profilePic: ret.profilePic,
      coverPic: ret.coverPic,
      isPublicProfile: ret.isPublicProfile,
      isProfileCreated: ret.isProfileCreated,
      viewCount: ret.viewCount,
      followerCount: ret.followerCount,
      followingCount: ret.followingCount,
      profilePercentage: ret.profilePercentage,
      isPublic: ret.isPublic,
    };
  },
});
