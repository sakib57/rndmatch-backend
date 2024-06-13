import { IPaginate } from '../../common/interfaces';
import { IPackage } from './package.interface';

export interface IPaginatePackage extends IPaginate {
  packages: IPackage[];
  message?: string;
}
