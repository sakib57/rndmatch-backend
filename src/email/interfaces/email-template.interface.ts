import { IMedia } from '../../common/interfaces';

export interface IEmailTemplate {
  readonly _id: string;
  readonly emailUser: string;
  readonly emailPassword: string;
  readonly contentType: string;
  readonly subject: string;
  readonly description: string;
  readonly signatureLogo: IMedia;
  readonly signature: string;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
}
