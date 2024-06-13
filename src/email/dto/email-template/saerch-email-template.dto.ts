import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { EmailContentType } from '../../../common/mock/constant.mock';
import { SearchQueryDTO } from '../../../common/dto/searchquery.dto';

export class SearchEmailTemplateDTO extends SearchQueryDTO {
  @ApiProperty()
  emailUser: string;

  @ApiProperty({ enum: EmailContentType })
  @IsEnum(EmailContentType)
  contentType: string;

  @ApiProperty()
  subject: string;
}
