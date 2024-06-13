import {
  IsArray,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Continent } from '../../../common/mock/constant.mock';
import { Type } from 'class-transformer';
import { ExtObjDTO } from './country.dto';

export class CreateCountryDTO implements Readonly<CreateCountryDTO> {
  @ApiProperty()
  @MaxLength(80)
  @MinLength(3)
  @IsString()
  name: string;

  @ApiProperty()
  @MaxLength(2)
  @MinLength(10)
  @IsString()
  iso2code: string;

  @ApiProperty({
    type: ExtObjDTO,
  })
  @ValidateNested({ each: true })
  @Type(() => ExtObjDTO)
  region: ExtObjDTO;

  @ApiProperty({
    type: ExtObjDTO,
  })
  @ValidateNested({ each: true })
  @Type(() => ExtObjDTO)
  incomeLevel: ExtObjDTO;

  @ApiProperty()
  dialingCode: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  capitalCity: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;

  @ApiProperty()
  @IsArray()
  languages: [];

  @ApiProperty()
  @IsArray()
  timezones: Array<any>;

  @ApiProperty({ enum: Continent })
  @IsEnum(Continent)
  continent: Continent;

  @ApiProperty()
  flag: string;

  @ApiProperty()
  flagEmoji: string;

  @ApiProperty()
  emojiUnicode: string;
}
