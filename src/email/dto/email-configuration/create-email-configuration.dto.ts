import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';

export class CreateEmailConfigurationDTO
  implements Readonly<CreateEmailConfigurationDTO>
{
  @ApiProperty()
  mailServer: string;

  @ApiProperty({
    required: true,
  })
  smtpHost: string;

  @ApiProperty({
    required: true,
  })
  @Type(() => Number)
  smtpPort: number;

  @ApiProperty()
  @IsEmail()
  defaultUser: string;

  @ApiProperty()
  @MinLength(3)
  defaultPassword: string;

  @ApiProperty({ required: false })
  defaultSignature: string;

  @ApiProperty({ required: false })
  isDefault: boolean;
}
