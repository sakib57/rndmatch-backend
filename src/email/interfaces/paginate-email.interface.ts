import { IPaginate } from '../../common/interfaces/paginate.interface';
import { IEmail } from '../../email/interfaces';
export interface IPaginateEmail extends IPaginate {
  data: IEmail[];
}
