import { ApiProperty } from '@nestjs/swagger';

export class OfferDTO implements Readonly<OfferDTO> {
  @ApiProperty({
    example: 'string: {quantity} will be replace with quantity',
  })
  text: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ default: false })
  isDeleted: boolean;
}
