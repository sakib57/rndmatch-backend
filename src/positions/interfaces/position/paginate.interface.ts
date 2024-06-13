import { IPaginate } from '../../../common/interfaces';
import { IPosition } from './position.interface';

export interface IPaginatePositions extends IPaginate {
  data: {
    positions: IPosition[];
  };
  message?: string;
}
