import { IPrice } from './price.interface';

export interface IFootNote {
  readonly _id: string;
  readonly text: string;
  readonly price: IPrice;
  readonly isDeleted: boolean;
}
