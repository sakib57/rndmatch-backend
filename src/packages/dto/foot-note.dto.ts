import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Price } from '../schemas/price.schema';
import { PriceDTO } from './price.dto';

export class FootNoteDTO implements Readonly<FootNoteDTO> {
  @ApiProperty({
    example:
      'string: {currency} and {amount} will be replace with currency and amount respectively.',
  })
  text: string;

  @ApiProperty({
    type: [PriceDTO],
  })
  @Type(() => PriceDTO)
  price: Price[];

  @ApiProperty({ default: false })
  isDeleted: boolean;
}
