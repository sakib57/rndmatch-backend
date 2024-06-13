import { ApiProperty } from '@nestjs/swagger';
import { SearchQueryDTO } from '../../../common/dto/searchquery.dto';

export class SearchEmailConfigurationDTO extends SearchQueryDTO {
  @ApiProperty()
  defaultUser: string;

  @ApiProperty()
  isDefault: boolean;
}
