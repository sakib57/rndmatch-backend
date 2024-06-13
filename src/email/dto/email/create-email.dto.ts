import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, MinLength } from 'class-validator';
import { MediaDocument } from '../../../common/schemas';
import { MediaDTO } from '../../../common/dto';

export class CreateEmailDTO implements Readonly<CreateEmailDTO> {
  @ApiProperty()
  emailUser: string;

  @ApiProperty()
  @MinLength(3)
  emailPassword: string;

  @ApiProperty()
  @IsArray()
  to: string[];

  @ApiProperty()
  subject: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @Type(() => MediaDTO)
  signatureLogo: MediaDocument;

  @ApiProperty()
  attachments: MediaDocument[];

  @ApiProperty()
  signature: string;

  @ApiProperty()
  isSuccess: boolean;
}
