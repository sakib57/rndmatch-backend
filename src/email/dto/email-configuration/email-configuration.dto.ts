import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class EmailConfigurationDTO implements Readonly<EmailConfigurationDTO> {
  @ApiProperty()
  mailServer: string;

  @ApiProperty({
    required: true,
    default: process.env.EMAIL_HOST,
  })
  smtpHost: string;

  @ApiProperty({
    required: true,
    default: process.env.EMAIL_PORT,
  })
  smtpPort: number;

  @ApiProperty({ default: process.env.EMAIL_AUTH_USER })
  defaultUser: string;

  @ApiProperty({ default: process.env.EMAIL_AUTH_PASSWORD })
  @MinLength(3)
  defaultPassword: string;

  @ApiProperty({ default: 'The iLafe Team' })
  defaultSignature: string;

  @ApiProperty({ default: false })
  isDefault: boolean;

  @ApiProperty({ default: Date.now() })
  cTime: number;

  @ApiProperty()
  cBy: string;

  @ApiProperty({ default: Date.now() })
  uTime: number;

  @ApiProperty()
  uBy: string;
}
