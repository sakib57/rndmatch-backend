import { Document } from 'mongoose';
import { IUser } from '../../users/interfaces';
import { IJob } from '../../jobs/interfaces';

export interface ISaved extends Document {
  readonly _id: string;
  readonly user: IUser;
  readonly job: IJob;
  readonly isSaved: boolean;
}
