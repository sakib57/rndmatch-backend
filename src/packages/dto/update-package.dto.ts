import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { FootNote } from '../schemas/foot-note.schema';
import { Offer } from '../schemas/offer.schema';
import { Price } from '../schemas/price.schema';
import { FootNoteDTO } from './foot-note.dto';
import { OfferDTO } from './offer.dto';
import { PriceDTO } from './price.dto';

export class UpdatePackageDTO implements Readonly<UpdatePackageDTO> {
  @ApiProperty({
    type: OfferDTO,
  })
  @Type(() => OfferDTO)
  offer: Offer;

  @ApiProperty({
    type: FootNoteDTO,
  })
  @Type(() => FootNoteDTO)
  footNote: FootNote;

  @ApiProperty({
    type: [PriceDTO],
  })
  @Type(() => PriceDTO)
  weeklyPrice: Price[];

  @ApiProperty({
    type: [PriceDTO],
  })
  @Type(() => PriceDTO)
  monthlyPrice: Price[];

  @ApiProperty({
    type: [PriceDTO],
  })
  @Type(() => PriceDTO)
  annualPrice: Price[];

  @ApiProperty({ default: true })
  hasTrial: boolean;

  @ApiProperty({ default: 7 })
  trialPeriod: number;

  @ApiProperty({ default: 'Unlimited' })
  matchingProfile: string;

  @ApiProperty({ default: 'Unlimited' })
  shortlisting: string;

  @ApiProperty({ default: 2 })
  activePositions: number;

  @ApiProperty({ default: 2 })
  hiringManagers: number;

  @ApiProperty({ default: 2 })
  additionalUserSeats: number;

  @ApiProperty({ default: 2 })
  backgroundChecks: number;

  @ApiProperty({ default: true })
  interviewScheduler: boolean;

  @ApiProperty({ default: true })
  videoInterview: boolean;

  @ApiProperty({ default: true })
  dedicatedSupport: boolean;

  @ApiProperty({ default: false })
  teamAnalytics: boolean;

  @ApiProperty({ default: false })
  advanceTeamAnalytics: boolean;

  @ApiProperty({ default: false })
  dedicatedCSManager: boolean;

  @ApiProperty({ default: false })
  invoiceBilling: boolean;

  @ApiProperty({ default: false })
  customServiceLevelAgreement: boolean;

  @ApiProperty()
  timezone: string;
}
