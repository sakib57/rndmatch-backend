export interface IProject {
  readonly _id: string;
  readonly title: string;
  readonly startDate: number;
  readonly endDate: number;
  readonly url: string;
  readonly description: string;
  readonly contributors: string[];
  readonly isActive: boolean;
  readonly isDeleted: boolean;
}
