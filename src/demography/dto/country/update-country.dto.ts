import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCountryDTO implements Readonly<UpdateCountryDTO> {
  @ApiProperty()
  dialingCode: string;

  @ApiProperty()
  @IsArray()
  languages: [];
}
