import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FaqDTO implements Readonly<FaqDTO> {
  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsString()
  answer: string;

  @ApiProperty()
  isDeleted: boolean;
}
