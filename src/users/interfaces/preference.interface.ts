export interface IPreference {
  readonly _id: string;
  readonly salaryExpectation: number;
  readonly currency: string;
  readonly seniorityLevel: string[];
  readonly workLocation: string[];
  readonly workType: string[]; // remote, hybrid, on-site
  readonly workingTimezone: string[];
  readonly employmentType: string[];
  readonly preferredSkills: string[];
  readonly industries: string[];
  readonly positions: string[];
  readonly companySize: string;
  readonly isDeleted: boolean;
}
