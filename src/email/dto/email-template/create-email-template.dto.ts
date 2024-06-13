import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { EmailContentType } from '../../../common/mock/constant.mock';
import { MediaDTO } from '../../../common/dto';
import { MediaDocument } from '../../../common/schemas';
import { IsEnum, MinLength } from 'class-validator';

export class CreateEmailTemplateDTO
  implements Readonly<CreateEmailTemplateDTO>
{
  @ApiProperty({ required: true })
  emailUser: string;

  @ApiProperty({ required: true })
  @MinLength(3)
  emailPassword: string;

  @ApiProperty({ required: true, enum: EmailContentType })
  @IsEnum(EmailContentType)
  contentType: string;

  @ApiProperty({ required: true })
  subject: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: false })
  @Type(() => MediaDTO)
  signatureLogo: MediaDocument;

  @ApiProperty({ required: false })
  signature: string;
}
