import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HideDTO implements Readonly<HideDTO> {
  @ApiProperty()
  @IsMongoId()
  user: string;

  @ApiProperty()
  @IsMongoId()
  job: string;

  @ApiProperty()
  isHide: boolean;

  cTime: number;
  cBy: string;
  uTime: number;
  uBy: string;
}
