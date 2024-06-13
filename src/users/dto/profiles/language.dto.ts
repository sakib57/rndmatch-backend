import { ApiProperty } from '@nestjs/swagger';
import { LanguageProficiency } from '../../../common/mock/constant.mock';
import { IsEnum } from 'class-validator';

export class LanguageDTO implements Readonly<LanguageDTO> {
  @ApiProperty({
    example: 'ENGLISH',
  })
  language: string;

  @ApiProperty({
    enum: LanguageProficiency,
    example: LanguageProficiency.FULL_PROFESSIONAL,
  })
  @IsEnum(LanguageProficiency)
  proficiency: string;

  @ApiProperty({
    default: false,
  })
  isDeleted: boolean;
}
