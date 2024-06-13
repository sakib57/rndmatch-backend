import { ApiProperty } from '@nestjs/swagger';
import { MediaDTO } from '../../../common/dto';
import { Type } from 'class-transformer';
import { Media } from '../../../common/schemas';

export class ExtDTO implements Readonly<ExtDTO> {
  @ApiProperty({
    type: MediaDTO,
  })
  @Type(() => MediaDTO)
  resume: Media;

  @ApiProperty()
  resumeUTime: number;

  @ApiProperty()
  isDeleted: boolean;
}
