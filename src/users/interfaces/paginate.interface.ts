import { IPaginate } from '../../common/interfaces';
import { IUser } from './user.interface';
import { IUserProfile } from './user-profile.interface';

export interface IPaginateUser extends IPaginate {
  data: IUser[];
  message?: string;
}

export interface IPaginateUserProfile extends IPaginate {
  data: IUserProfile[];
  message?: string;
}
