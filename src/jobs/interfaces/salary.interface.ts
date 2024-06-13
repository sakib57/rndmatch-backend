export interface ISalary {
  readonly _id: string;
  readonly min: number;
  readonly max: number;
  readonly currency: string;
  readonly isShown: boolean;
}
