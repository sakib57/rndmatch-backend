import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class FakeDTO implements Readonly<FakeDTO> {
  @ApiProperty()
  @Min(1)
  quantity: number;
}
