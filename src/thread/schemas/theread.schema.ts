import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { JobDocument } from '../../jobs/schemas';
import { UserDocument } from '../../users/schemas';

export type ThreadDocument = Thread & Document;
@Schema()
export class Thread {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Job',
  })
  job: JobDocument;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  userOne: UserDocument;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  userTwo: UserDocument;

  @Prop({ default: false })
  isUserOneRead: boolean;

  @Prop({ default: false })
  isUserTwoRead: boolean;

  @Prop({ default: false })
  isUserOneOnline: boolean;

  @Prop({ default: false })
  isUserTwoOnline: boolean;

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
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);

ThreadSchema.virtual('chats', {
  ref: 'Chat',
  localField: '_id',
  foreignField: 'thread',
});

ThreadSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    return {
      _id: ret._id,
      job: ret.job,
      userOne: ret.userOne,
      userTwo: ret.userTwo,
      chats: ret.chats,
      isUserOneRead: ret.isUserOneRead,
      isUserTwoRead: ret.isUserTwoRead,
      isUserOneOnline: ret.isUserOneOnline,
      isUserTwoOnline: ret.isUserTwoOnline,
      isDeleted: ret.isDeleted,
      cTime: ret.cTime,
      cBy: ret.cBy,
      uTime: ret.uTime,
      uBy: ret.uBy,
    };
  },
});
