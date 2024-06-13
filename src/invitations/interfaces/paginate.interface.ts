import { IPaginate } from '../../common/interfaces';
import { IInvitation } from './invitation.interface';

export interface IPaginateInvitation extends IPaginate {
  invitations: IInvitation[];
  message?: string;
}
