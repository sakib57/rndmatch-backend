import { IsMongoId, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDTO implements Readonly<CreateSkillDTO> {
  @ApiProperty({
    example: 'Python',
  })
  @MaxLength(100)
  @MinLength(1)
  name: string;

  @ApiProperty()
  timezone: string;
}
