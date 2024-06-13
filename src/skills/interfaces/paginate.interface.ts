import { IPaginate } from '../../common/interfaces';
import { ISkills } from './skills.interface';
export interface IPaginateSkills extends IPaginate {
  data: {
    skills: ISkills[];
  };
  message?: string;
}
