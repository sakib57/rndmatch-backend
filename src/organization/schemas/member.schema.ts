import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Organization } from './organization.schema';
import { User } from '../../users/schemas';
import { Role, Status } from '../../common/mock/constant.mock';

export type MemberDocument = Member & Document;

@Schema()
export class Member {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Organization',
    required: true,
  })
  organization: Organization;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop({ default: Role.MEMBER })
  role: string;

  @Prop({ default: Status.INVITED })
  status: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: false })
  isOwner: boolean;

  @Prop({ default: false })
  isPaid: boolean;

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

export const MemberSchema = SchemaFactory.createForClass(Member);

MemberSchema.index(
  {
    organization: 1,
    user: 1,
  },
  {
    unique: true,
  },
);

MemberSchema.set('toJSON', {
  transform: function (doc, ret) {
    return {
      _id: ret._id,
      organization: ret.organization,
      user: ret.user,
      role: ret.role,
      status: ret.status,
      isAdmin: ret.isAdmin,
      isOwner: ret.isOwner,
      isPaid: ret.isPaid,
      isActive: ret.isActive,
      isDeleted: ret.isDeleted,
    };
  },
});
