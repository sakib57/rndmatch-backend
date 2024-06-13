import { MaxLength, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CertificateDTO implements Readonly<CertificateDTO> {
  @ApiProperty({
    example: 'Artificial Intelligence Symposium',
  })
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(1)
  name: string;

  @ApiProperty({
    example: 'IBM',
  })
  @MaxLength(50)
  @MinLength(1)
  issuingAuthority: string;

  @ApiProperty()
  issuingDate: number;

  @ApiProperty({
    example:
      'https://www.dropbox.com/s/gzyn25f7g269z6d/ParticipateAiSymposium.pdf?dl=0',
  })
  credentialUrl: string;

  @ApiProperty({
    default: false,
  })
  isDeleted: boolean;
}
