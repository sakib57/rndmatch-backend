export interface IPresentation {
  readonly _id: string;
  readonly title: string;
  readonly presentedAt: string;
  readonly presentationDate: number;
  readonly url: string;
  readonly description: string;
  readonly presenters: string[];
  readonly isDeleted: boolean;
}
