import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SavedDTO implements Readonly<SavedDTO> {
  @ApiProperty()
  @IsMongoId()
  user: string;

  @ApiProperty()
  @IsMongoId()
  job: string;

  @ApiProperty()
  isSaved: boolean;

  cTime: number;
  cBy: string;
  uTime: number;
  uBy: string;
}
