import { IPaginate } from '../../../common/interfaces';
import { IOrganization } from './organization.interface';

export interface IPaginateOrganization extends IPaginate {
  data: IOrganization[];
  message?: string;
}
