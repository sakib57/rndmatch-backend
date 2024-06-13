import { IPaginate } from '../../../common/interfaces';
import { IField } from './field.interface';

export interface IPaginateFields extends IPaginate {
  data: {
    fields: IField[];
  };
  message?: string;
}
