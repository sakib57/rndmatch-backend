import { IPaginate } from '../../../common/interfaces';
import { IJob } from './job.interface';

export interface IPaginateJob extends IPaginate {
  jobs: IJob[];
  message?: string;
}
