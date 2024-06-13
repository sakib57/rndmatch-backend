import { IsMongoId, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSkillDTO implements Readonly<UpdateSkillDTO> {
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
  timezone: string;
}
