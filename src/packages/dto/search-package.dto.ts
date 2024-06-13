import { SearchQueryDTO } from '../../common/dto';

export class SearchPackageDTO
  extends SearchQueryDTO
  implements Readonly<SearchPackageDTO> {}
