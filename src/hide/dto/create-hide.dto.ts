import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHideDTO implements Readonly<CreateHideDTO> {
  @ApiProperty()
  @IsMongoId()
  user: string;

  @ApiProperty()
  @IsMongoId()
  job: string;

  @ApiProperty()
  isHide: boolean;

  @ApiProperty()
  timezone: string;
}
