import { IMedia } from '../../common/interfaces';
import { IJob } from '../../jobs/interfaces';
import { IUser } from '../../users/interfaces';

export interface IJobApplication {
  readonly _id: string;
  readonly job: IJob;
  readonly jobSeeker: IUser;
  readonly status: string;
  readonly applicationDate: number;
  readonly interviewDate: number;
  readonly hiringTeam: IUser[];
  readonly resume: IMedia;
  readonly isActive: boolean;
  readonly isDeleted: boolean;
}
