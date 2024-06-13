import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SearchQueryDTO } from '../../../common/dto';

export class SearchUserProfileDTO
  extends SearchQueryDTO
  implements Readonly<SearchUserProfileDTO>
{
  @ApiProperty({ required: false })
  @IsOptional()
  distance: number;

  @ApiProperty({ required: false })
  @IsOptional()
  lat: number;

  @ApiProperty({ required: false })
  @IsOptional()
  lng: number;
}
