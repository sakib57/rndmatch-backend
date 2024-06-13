import { IsMongoId, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MessageTemplateDTO implements Readonly<MessageTemplateDTO> {
  @ApiProperty({
    example: 'Hello',
  })
  @MaxLength(500)
  @MinLength(2)
  title: string;

  @ApiProperty({
    example: 'Good morning!',
  })
  @MinLength(2)
  message: string;

  @ApiProperty()
  @IsMongoId()
  user: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  cTime: number;

  @ApiProperty()
  cBy: string;

  @ApiProperty()
  uTime: number;

  @ApiProperty()
  uBy: string;

  @ApiProperty()
  dTime: number;

  @ApiProperty()
  dBy: string;

  @ApiProperty()
  timezone: string;
}
