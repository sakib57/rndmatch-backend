import { IFootNote } from './foot-note.interface';
import { IOffer } from './offer.interface';
import { IPrice } from './price.interface';

export interface IPackage {
  readonly _id: string;
  readonly name: string;
  readonly offer: IOffer;
  readonly footNote: IFootNote;
  readonly weeklyPrice: IPrice;
  readonly monthlyPrice: IPrice;
  readonly annualPrice: IPrice;
  readonly hasTrial: boolean;
  readonly trialPeriod: boolean;
  readonly matchingProfile: string;
  readonly shortlisting: string;
  readonly activePositions: number;
  readonly hiringManagers: number;
  readonly additionalUserSeats: number;
  readonly backgroundChecks: number;
  readonly interviewScheduler: boolean;
  readonly videoInterview: boolean;
  readonly dedicatedSupport: boolean;
  readonly teamAnalytics: boolean;
  readonly advanceTeamAnalytics: boolean;
  readonly dedicatedCSManager: boolean;
  readonly invoiceBilling: boolean;
  readonly customServiceLevelAgreement: boolean;
  readonly isActive: boolean;
  readonly isDeleted: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
  readonly dTime: number;
  readonly dBy: string;
}
