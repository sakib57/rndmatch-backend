import { IJob } from '../../jobs/interfaces';
import { IUser, IUserProfile } from '../../users/interfaces';

export interface IInvitation {
  readonly _id: string;
  readonly inviteFrom: IUser;
  readonly inviteTo: string;
  readonly token: string;
  readonly tokenExpiresAt: number;
  readonly candidateProfile: IUserProfile;
  readonly job: IJob;
  readonly isAccepted: boolean;
  readonly isActive: boolean;
  readonly isDeleted: boolean;
}
