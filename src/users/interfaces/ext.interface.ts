import { IMedia } from '../../common/interfaces';

export interface IExt {
  readonly _id: string;
  readonly resume: IMedia;
  readonly resumeUTime: number;
  readonly isDeleted: boolean;
}
