import { IUserProfile } from './user-profile.interface';

export interface IUser {
  readonly _id: string;
  readonly email: string;
  readonly password: string;
  readonly profile: IUserProfile;
  readonly userPreference: string;
  readonly otp: number;
  readonly otpExpiresAt: number;
  readonly emailProofToken: string;
  readonly emailProofTokenExpiresAt: number;
  readonly passwordResetToken: string;
  readonly passwordResetTokenExpiresAt: number;
  readonly isAdmin: boolean;
  readonly isSuperAdmin: boolean;
  readonly isFake: boolean;
  readonly isActive: boolean;
  readonly isVerified: boolean;
  readonly isRegistered: boolean;
  readonly isDeleted: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
  readonly dTime: number;
  readonly dBy: string;
}
