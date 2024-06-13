import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { JobDocument } from '../../jobs/schemas';
import { UserDocument, UserProfileDocument } from '../../users/schemas';

export type InvitationDocument = Invitation & Document;

@Schema()
export class Invitation {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  inviteFrom: UserDocument;

  @Prop({ required: true })
  inviteTo: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  tokenExpiresAt: number;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Profile',
  })
  candidateProfile: UserProfileDocument;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Job',
  })
  job: JobDocument;

  @Prop({ default: false })
  isAccepted: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: Date.now() })
  cTime: number;

  @Prop()
  cBy: string;

  @Prop()
  uTime: number;

  @Prop()
  uBy: string;

  @Prop()
  dTime: number;

  @Prop()
  dBy: string;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);
