import { Document } from 'mongoose';
import { IUser } from '../../users/interfaces/user.interface';
import { IThread } from './thread.interface';
import { IMedia } from '../../common/interfaces';

export interface IChat extends Document {
  readonly _id: string;
  readonly thread: IThread;
  message: string;
  readonly files: IMedia[];
  readonly sender: IUser;
  readonly receiver: IUser;
  readonly isRead: boolean;
  readonly isDeleted: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
}
