import { ApiProperty } from '@nestjs/swagger';

export class SignatureLogoUpload implements Readonly<SignatureLogoUpload> {
  @ApiProperty({ type: 'string', format: 'binary' })
  signatureLogo: Express.Multer.File;
}
