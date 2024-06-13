export interface IEmailConfiguration {
  readonly _id?: string;
  readonly mailServer: string;
  readonly smtpHost: string;
  readonly smtpPort: number;
  defaultUser: string;
  defaultPassword: string;
  readonly defaultSignature: string;
  readonly isDefault: boolean;
  readonly cTime?: number;
  readonly cBy?: string;
  readonly uTime?: number;
  readonly uBy?: string;
}
