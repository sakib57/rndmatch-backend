import { IUser } from '../../users/interfaces';

export interface IMessageTemplate {
  readonly _id: string;
  readonly title: string;
  readonly message: string;
  readonly user: IUser;
  readonly isActive: boolean;
  readonly isDeleted: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
  readonly dTime: number;
  readonly dBy: string;
}
