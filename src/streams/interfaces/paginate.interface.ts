import { IPaginate } from '../../common/interfaces';
import { IStreams } from './streams.interface';

export interface IPaginateStream extends IPaginate {
  data: {
    streams: IStreams[];
  };
  message?: string;
}
