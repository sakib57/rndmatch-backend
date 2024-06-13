import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SearchQueryDTO } from '../../../common/dto';

export class SearchPositionDTO
  extends SearchQueryDTO
  implements Readonly<SearchPositionDTO>
{
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  groupBy: string;
}
