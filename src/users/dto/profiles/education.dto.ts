import { MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EducationDTO implements Readonly<EducationDTO> {
  @ApiProperty({
    example: 'New York University',
  })
  @MaxLength(100)
  @MinLength(2)
  school: string;

  @ApiProperty({
    example: 'B.Sc',
  })
  @MaxLength(50)
  @MinLength(2)
  degree: string;

  @ApiProperty({
    example: 'New York University',
  })
  @MaxLength(50)
  @MinLength(1)
  subject: string;

  @ApiProperty({
    example: 90,
  })
  grade: number;

  @ApiProperty()
  startDate: number;

  @ApiProperty()
  endDate: number;

  @ApiProperty({
    default: false,
  })
  isDeleted: boolean;
}
