import { IPosition } from '../../positions/interfaces';
import { ISalary } from '../../jobs/interfaces';
import { ILocation } from '../../common/interfaces';
import { ISkills } from '../../skills/interfaces';

export interface IStreams {
  readonly _id: string;
  readonly name: string;
  readonly position: IPosition[] | string[];
  readonly sortBy: string;
  readonly jobTitle: string;
  readonly primarySkills: ISkills[] | string[];
  readonly allSkills: ISkills[] | string[];
  readonly salaryRange: ISalary;
  readonly workType: string[];
  readonly workEligibility: string[];
  readonly currentLocation: ILocation;
  readonly underrepresentedGroups: string[];
  readonly isActive: boolean;
  readonly isDeleted: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
  readonly dTime: number;
  readonly dBy: string;
}
