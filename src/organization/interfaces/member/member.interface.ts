import { IUser } from '../../../users/interfaces';
import { IOrganization } from '../organization/organization.interface';

export interface IMember {
  readonly _id: string;
  readonly user: IUser | string;
  readonly organization: IOrganization | string;
  readonly role: string;
  readonly status: string;
  readonly isAdmin: boolean;
  readonly isOwner: boolean;
  readonly isPaid: boolean;
  readonly isActive: boolean;
  readonly isDeleted: boolean;
}
