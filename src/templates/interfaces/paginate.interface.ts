import { IPaginate } from '../../common/interfaces';
import { IMessageTemplate } from './message-template.interface';

export interface IPaginateMessageTemplate extends IPaginate {
  data: IMessageTemplate[];
  message?: string;
}
