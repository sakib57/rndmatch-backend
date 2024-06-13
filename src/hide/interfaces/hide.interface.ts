import { Document } from 'mongoose';
import { IUser } from '../../users/interfaces';
import { IJob } from '../../jobs/interfaces';

export interface IHide extends Document {
  readonly _id: string;
  readonly user: IUser;
  readonly job: IJob;
  readonly isHide: boolean;
}
