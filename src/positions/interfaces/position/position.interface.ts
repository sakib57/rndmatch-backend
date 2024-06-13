import { IDiscipline } from '../discipline/discipline.interface';
import { IField } from '../field/field.interface';

export interface IPosition {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly field: IField;
  readonly discipline: IDiscipline;
  readonly isActive: boolean;
  readonly isDeleted: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
  readonly dTime: number;
  readonly dBy: string;
}
