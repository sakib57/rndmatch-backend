import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateChatDto implements Readonly<UpdateChatDto> {
  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  isDeleted: boolean;
}
