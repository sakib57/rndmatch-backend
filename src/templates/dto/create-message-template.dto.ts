import { IsMongoId, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageTemplateDTO
  implements Readonly<CreateMessageTemplateDTO>
{
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
  timezone: string;
}
