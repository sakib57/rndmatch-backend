import {
  ILocation,
  IMedia,
  IMobile,
  ISocial,
} from '../../../common/interfaces';
import { ITestimonial } from './testimonial.interface';
import { IFaq } from './faq.interface';

export interface IOrganization {
  readonly _id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly location: ILocation;
  readonly yearFounded: number;
  readonly orgSize: string;
  readonly industryType: string;
  readonly website: string;
  readonly mobile: IMobile;
  readonly email: string;
  readonly tagline: string;
  readonly logo: IMedia;
  readonly banner: IMedia[];
  readonly videos: IMedia[];
  readonly pictures: IMedia[];
  readonly socials: ISocial[];
  readonly testimonials: ITestimonial[];
  readonly faqs: IFaq[];
  readonly parentOrg: IOrganization;
  readonly isActive: boolean;
  readonly isVerified: boolean;
  readonly isDeleted: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
  readonly dTime: number;
  readonly dBy: string;
}
