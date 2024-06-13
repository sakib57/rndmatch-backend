import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PackageName } from '../../common/mock/constant.mock';
import { PriceDocument, PriceSchema } from './price.schema';
import { FootNoteSchema, FootNoteDocument } from './foot-note.schema';
import { OfferSchema, OfferDocument } from './offer.schema';

export type PackagesDocument = Packages & Document;

@Schema()
export class Packages {
  @Prop({
    required: true,
    enum: PackageName,
  })
  name: string;

  @Prop({
    type: OfferSchema,
  })
  offer: OfferDocument;

  @Prop({
    type: FootNoteSchema,
  })
  footNote: FootNoteDocument;

  @Prop({
    type: [PriceSchema],
    default: undefined,
  })
  weeklyPrice: PriceDocument[];

  @Prop({
    type: [PriceSchema],
    required: true,
  })
  monthlyPrice: PriceDocument[];

  @Prop({
    type: [PriceSchema],
    required: true,
  })
  annualPrice: PriceDocument[];

  @Prop({ default: true })
  hasTrial: boolean;

  @Prop({ default: 7 })
  trialPeriod: number;

  @Prop({ default: 'Unlimited' })
  matchingProfile: string;

  @Prop({ default: 'Unlimited' })
  shortlisting: string;

  @Prop({ default: 2 })
  activePositions: number;

  @Prop({ default: 2 })
  hiringManagers: number;

  @Prop({ default: 2 })
  additionalUserSeats: number;

  @Prop({ default: 0 })
  backgroundChecks: number;

  @Prop({ default: true })
  interviewScheduler: boolean;

  @Prop({ default: true })
  videoInterview: boolean;

  @Prop({ default: true })
  dedicatedSupport: boolean;

  @Prop({ default: false })
  teamAnalytics: boolean;

  @Prop({ default: false })
  advanceTeamAnalytics: boolean;

  @Prop({ default: false })
  dedicatedCSManager: boolean;

  @Prop({ default: false })
  invoiceBilling: boolean;

  @Prop({ default: false })
  customServiceLevelAgreement: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: Date.now() })
  cTime: number;

  @Prop()
  cBy: string;

  @Prop({ default: Date.now() })
  uTime: number;

  @Prop()
  uBy: string;

  @Prop({ default: Date.now() })
  dTime: number;

  @Prop()
  dBy: string;
}

export const PackagesSchema = SchemaFactory.createForClass(Packages);
