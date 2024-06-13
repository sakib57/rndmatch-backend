import { MaxLength, Matches, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MediaDTO } from '../../../common/dto';
import { Type } from 'class-transformer';
import { Media } from '../../../common/schemas';

export class TestimonialDTO implements Readonly<TestimonialDTO> {
  @ApiProperty()
  @MaxLength(100)
  @Matches(/^[a-zA-Z ]+$/)
  @IsString()
  name: string;

  @ApiProperty()
  @MaxLength(5000)
  @IsString()
  description: string;

  @ApiProperty()
  testimonial: string;

  @ApiProperty({
    type: MediaDTO,
  })
  @Type(() => MediaDTO)
  video: Media;

  @ApiProperty({
    type: MediaDTO,
  })
  @Type(() => MediaDTO)
  picture: Media;

  @ApiProperty()
  isDeleted: boolean;
}
