export interface ICertificate {
  readonly _id: string;
  readonly name: string;
  readonly issuingAuthority: string;
  readonly issuingDate: number;
  readonly credentialUrl: string;
  readonly isDeleted: boolean;
}
