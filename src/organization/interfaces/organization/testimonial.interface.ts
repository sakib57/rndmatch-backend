import { IMedia } from '../../../common/interfaces';

export interface ITestimonial {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  readonly testimonial: string;
  readonly video: IMedia;
  readonly picture: IMedia;
  readonly isDeleted: boolean;
}
