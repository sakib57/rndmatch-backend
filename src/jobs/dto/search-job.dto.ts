import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SearchQueryDTO } from 'src/common/dto';

export class SearchJobDTO
  extends SearchQueryDTO
  implements Readonly<SearchJobDTO>
{
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  groupBy: string;
}
