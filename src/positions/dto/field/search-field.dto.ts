import { SearchQueryDTO } from '../../../common/dto';

export class SearchFieldDTO
  extends SearchQueryDTO
  implements Readonly<SearchFieldDTO> {}
