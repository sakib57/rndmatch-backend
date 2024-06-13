import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { PositionType } from 'src/common/mock/constant.mock';
import { Discipline, Field, Position } from 'src/positions/schemas';

export type PositionTitleDocument = PositionTitle & Document;

@Schema()
export class PositionTitle {
  @Prop({ enum: PositionType, default: PositionType.Academic })
  type: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Position',
    required: true,
    immutable: true,
  })
  position: Position;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Field',
    immutable: true,
  })
  field: Field;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Discipline',
    immutable: true,
  })
  discipline: Discipline;
}

export const PositionTitleSchema = SchemaFactory.createForClass(PositionTitle);
