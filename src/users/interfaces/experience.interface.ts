import { ILocation } from '../../common/interfaces';

export interface IExperience {
  readonly _id: string;
  readonly designation: string;
  readonly employmentType: string;
  readonly organization: string;
  readonly industry: string;
  readonly headline: string;
  readonly description: string;
  readonly roles: string;
  readonly location: ILocation;
  readonly startDate: number;
  readonly endDate: number;
  readonly isStillWorking: boolean;
  readonly isDeleted: boolean;
}
