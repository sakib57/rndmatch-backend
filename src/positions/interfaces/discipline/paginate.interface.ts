import { IPaginate } from '../../../common/interfaces';
import { IDiscipline } from './discipline.interface';

export interface IPaginateDisciplines extends IPaginate {
  data: {
    disciplines: IDiscipline[];
  };
  message?: string;
}
