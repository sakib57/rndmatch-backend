import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSavedDTO implements Readonly<CreateSavedDTO> {
  @ApiProperty()
  @IsMongoId()
  user: string;

  @ApiProperty()
  @IsMongoId()
  job: string;

  @ApiProperty()
  isSaved: boolean;

  @ApiProperty()
  timezone: string;
}
