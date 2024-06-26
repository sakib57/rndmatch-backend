import { ILocation, IMedia } from '../../../common/interfaces';
import { IOrganization } from '../../../organization/interfaces';
import { ISkills } from '../../../skills/interfaces';
import { IUser } from '../../../users/interfaces';
import { ISalary } from '..';
import { IDiscipline, IField, IPosition } from '../../../positions/interfaces';

export interface IJob {
  readonly _id: string;
  readonly position: IPosition | string;
  readonly field: IField | string;
  readonly discipline: IDiscipline | number;
  readonly status: string;
  readonly title: string;
  readonly slug: string;
  readonly jobPic: IMedia;
  readonly internalLevels: string[];
  readonly description: string;
  readonly interviewProcess: string;
  readonly employmentType: string;
  readonly seniorityLevels: string[];
  readonly industry: string;
  readonly location: ILocation;
  readonly education: string;
  readonly primarySkills: ISkills[];
  readonly secondarySkills: ISkills[];
  readonly techStacks: ISkills[];
  readonly salaryRange: ISalary;
  readonly deadline: number;
  readonly hasSubscription: boolean;
  readonly hiringTeam: IUser | string;
  readonly organization: IOrganization | string;
  readonly postBy: IUser | string;
  readonly doesProvideVisaSponsorship: boolean;
  readonly isActive: boolean;
  readonly isDeleted: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
  readonly dTime: number;
  readonly dBy: string;
}
