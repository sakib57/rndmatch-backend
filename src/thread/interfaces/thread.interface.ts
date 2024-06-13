import { Document } from 'mongoose';
import { IJob } from 'src/jobs/interfaces';
import { IUser } from '../../users/interfaces/user.interface';
import { IChat } from './chat.interface';

export interface IThread extends Document {
  readonly _id: string;
  readonly job: IJob;
  readonly userOne: IUser;
  readonly userTwo: IUser;
  readonly isUserOneRead: boolean;
  readonly isUserTwoRead: boolean;
  readonly isUserOneOnline: boolean;
  readonly isUserTwoOnline: boolean;
  chats: IChat[];
  readonly isDeleted: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
}
