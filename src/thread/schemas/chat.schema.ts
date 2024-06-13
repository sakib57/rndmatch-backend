import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { UserDocument } from '../../users/schemas';
import { MediaDocument, MediaSchema } from '../../common/schemas';
import { decodeToken } from '../../common/utils/helper';
import { Logger } from '@nestjs/common';
import { ThreadDocument } from './theread.schema';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Thread',
    required: true,
  })
  thread: ThreadDocument;

  @Prop()
  message: string;

  @Prop({
    type: [MediaSchema],
    default: undefined,
  })
  files: MediaDocument[];

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
  })
  sender: UserDocument;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
  })
  receiver: UserDocument;

  @Prop({ default: false }) // receiver read
  isRead: boolean;

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

export const ChatSchema = SchemaFactory.createForClass(Chat);

ChatSchema.post('find', (docs, next) => {
  const password = 'oS1H+dKX1+OkXUu3jABIKqThi5/BJJtB0OCo';
  Promise.all(
    docs.map(async (doc) => {
      try {
        doc.message = await decodeToken(doc.message, password);
      } catch (err) {
        Logger.error(
          'Chat message decoding error: ',
          JSON.stringify(err),
          'EncodeDecodeException',
        );
        doc.message = undefined;
      }
      return doc;
    }),
  ).then(() => {
    next();
  });
});
