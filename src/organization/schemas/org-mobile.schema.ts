import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Mobile } from 'src/common/schemas';

export type OrgMobileDocument = OrgMobile & Document;

@Schema()
export class OrgMobile extends Mobile {
  @Prop({
    unique: true,
  })
  mobile: string;
}

export const OrgMobileSchema = SchemaFactory.createForClass(OrgMobile);
