import { IPaginate } from '../../common/interfaces';
import { IJobApplication } from './job-application.interface';

export interface IPaginateJobApplication extends IPaginate {
  jobApplications: IJobApplication[];
  message?: string;
}
