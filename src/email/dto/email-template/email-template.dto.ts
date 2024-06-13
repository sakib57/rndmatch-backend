import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, MinLength } from 'class-validator';
import { MediaDTO } from '../../../common/dto';
import { EmailContentType } from '../../../common/mock/constant.mock';

export class EmailTemplateDTO implements Readonly<EmailTemplateDTO> {
  @ApiProperty()
  emailUser: string;

  @ApiProperty()
  @MinLength(3)
  emailPassword: string;

  @ApiProperty({ enum: EmailContentType })
  @IsEnum(EmailContentType)
  contentType: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @Type(() => MediaDTO)
  signatureLogo: MediaDTO;

  @ApiProperty()
  signature: string;

  @ApiProperty()
  cTime: number;

  @ApiProperty()
  cBy: string;

  @ApiProperty()
  uTime: number;

  @ApiProperty()
  uBy: string;
}
