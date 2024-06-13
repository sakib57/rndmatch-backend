import { SearchQueryDTO } from '../../common/dto';

export class SearchStreamDTO
  extends SearchQueryDTO
  implements Readonly<SearchStreamDTO> {}
