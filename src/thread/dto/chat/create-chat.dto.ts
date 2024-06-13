import { IsString, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDTO implements Readonly<CreateChatDTO> {
  @ApiProperty()
  @IsMongoId()
  thread: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsMongoId()
  receiver: string;

  @ApiProperty()
  @IsString()
  timezone: string;
}
