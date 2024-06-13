import { IDiscipline } from '../discipline/discipline.interface';

export interface IField {
  readonly _id: string;
  readonly name: string;
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
