import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { SearchQueryDTO } from '../../../common/dto';

export class SearchEmailQueryDTO extends SearchQueryDTO {
  @ApiProperty({ required: false })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsEmail()
  to: string;

  @ApiProperty({ required: false })
  isSuccess: string;
}
