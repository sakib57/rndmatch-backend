import { IUser } from './user.interface';
import { ILocation, IMedia, IMobile, ISocial } from '../../common/interfaces';
import { ICertificate } from './certificate.interface';
import { ISkills } from '../../skills/interfaces';
import { IEducation } from './education.interface';
import { IExperience } from './experience.interface';
import { IExt } from './ext.interface';
import { IPublication } from './publication.interface';
import { IProject } from './project.interface';
import { ILanguage } from './language.interface';
import { IPreference } from './preference.interface';

export interface IUserProfile {
  readonly slug: string;
  readonly user: IUser | string;
  readonly firstName: string;
  readonly middleName: string;
  readonly lastName: string;
  readonly headline: string;
  readonly summary: string;
  readonly dob: number;
  readonly gender: string;
  readonly ethnicity: string;
  readonly diversity: string;
  readonly yearsOfExperience: number;
  readonly yearsAtThisOrg: number;
  readonly lifeAtThisOrg: string;
  readonly mobile: IMobile;
  readonly location: ILocation;
  readonly skills: ISkills[];
  readonly educations: IEducation[];
  readonly certificates: ICertificate[];
  readonly experiences: IExperience[];
  readonly publications: IPublication[];
  readonly projects: IProject[];
  readonly languages: ILanguage[];
  readonly socials: ISocial[];
  readonly preference: IPreference;
  readonly ext: IExt;
  readonly profilePic: IMedia;
  readonly coverPic: IMedia;
  readonly isPublicProfile: boolean;
  readonly isProfileCreated: boolean;
  readonly viewCount: number;
  readonly followerCount: number;
  readonly followingCount: number;
  readonly profilePercentage: number;
  readonly isActive: boolean;
  readonly isPublic: boolean;
  readonly isVerified: boolean;
  readonly isDeleted: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
  readonly dTime: number;
  readonly dBy: string;
}
