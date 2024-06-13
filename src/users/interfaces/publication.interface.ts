export interface IPublication {
  readonly _id: string;
  readonly title: string;
  readonly publisher: string;
  readonly publishingDate: number;
  readonly url: string;
  readonly description: string;
  readonly authors: string[];
  readonly isDeleted: boolean;
}
