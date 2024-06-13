import { IPaginate } from '../../../common/interfaces';
import { IMember } from './member.interface';
import { IOrganization } from '../organization/organization.interface';

export interface IPaginateMember extends IPaginate {
  data: {
    members: IMember[];
    organization?: IOrganization;
  };
  message?: string;
}
