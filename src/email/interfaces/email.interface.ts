import { IMedia } from '../../common/interfaces';

export interface IEmail {
  readonly _id: string;
  readonly emailUser: string;
  readonly emailPassword: string;
  readonly to: string[];
  readonly subject: string;
  readonly description: string;
  readonly signatureLogo: IMedia;
  readonly attachments: IMedia[];
  readonly signature: string;
  readonly isSuccess: boolean;
  readonly cTime: number;
  readonly cBy: string;
}
