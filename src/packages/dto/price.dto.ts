import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Currency } from 'src/common/mock/constant.mock';

export class PriceDTO implements Readonly<PriceDTO> {
  @ApiProperty()
  amount: number;

  @ApiProperty({
    enum: Currency,
    default: Currency.USD,
  })
  @IsEnum(Currency)
  currency: string;

  @ApiProperty({ default: false })
  isDeleted: boolean;
}
