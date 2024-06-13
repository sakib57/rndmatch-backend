import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { userPreference } from '../../common/mock/constant.mock';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: userPreference.JOB_SEEKER })
  userPreference: string;

  @Prop()
  otp: number;

  @Prop()
  otpExpiresAt: number;

  @Prop()
  emailProofToken: string;

  @Prop()
  emailProofTokenExpiresAt: number;

  @Prop()
  passwordResetToken: string;

  @Prop()
  passwordResetTokenExpiresAt: number;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: false })
  isSuperAdmin: boolean;

  @Prop({ default: false })
  isFake: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: true })
  isRegistered: boolean;

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

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('profile', {
  ref: 'UserProfile',
  localField: '_id',
  foreignField: 'user',
  justOne: true,
});

UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    return {
      _id: ret._id,
      email: ret.email,
      userPreference: ret.userPreference,
      isActive: ret.isActive,
      isVerified: ret.isVerified,
      isSuperAdmin: ret.isSuperAdmin,
      isAdmin: ret.isAdmin,
      isFake: ret.isFake,
      profile: ret.profile,
    };
  },
});
