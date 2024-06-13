import { IsMongoId, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SkillDTO implements Readonly<SkillDTO> {
  @ApiProperty({
    example: 'Python',
  })
  @MaxLength(100)
  @MinLength(1)
  name: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  cTime: number;

  @ApiProperty()
  cBy: string;

  @ApiProperty()
  uTime: number;

  @ApiProperty()
  uBy: string;

  @ApiProperty()
  dTime: number;

  @ApiProperty()
  dBy: string;

  @ApiProperty()
  timezone: string;
}
