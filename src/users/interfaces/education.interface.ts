export interface IEducation {
  readonly _id: string;
  readonly school: string;
  readonly degree: string;
  readonly subject: string;
  readonly grade: number;
  readonly startDate: number;
  readonly endDate: number;
  readonly isDeleted: boolean;
}
