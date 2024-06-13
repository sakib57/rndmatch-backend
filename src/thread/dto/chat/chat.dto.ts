import { IsString, IsMongoId, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MediaDTO } from '../../../common/dto';
import { Type } from 'class-transformer';
import { Media } from '../../../common/schemas';

export class ChatDTO implements Readonly<ChatDTO> {
  @ApiProperty()
  @IsMongoId()
  thread: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty({
    type: MediaDTO,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaDTO)
  files: [Media];

  @ApiProperty()
  @IsMongoId()
  sender: string;

  @ApiProperty()
  @IsMongoId()
  receiver: string;

  @ApiProperty()
  isRead: boolean;

  @ApiProperty()
  isDeleted: boolean;

  cTime: number;
  cBy: string;
  uTime: number;
  uBy: string;
}
