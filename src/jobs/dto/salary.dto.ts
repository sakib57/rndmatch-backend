import { IsBoolean, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '../../common/mock/constant.mock';

export class SalaryDTO implements Readonly<SalaryDTO> {
  @ApiProperty()
  @IsNumber()
  min: number;

  @ApiProperty()
  @IsNumber()
  max: number;

  @ApiProperty({
    enum: Currency,
    default: Currency.USD,
  })
  @IsEnum(Currency)
  currency: string;

  @ApiProperty()
  @IsBoolean()
  isShown: boolean;
}
