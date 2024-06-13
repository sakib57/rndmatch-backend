import { SearchQueryDTO } from '../../../common/dto';

export class SearchMemberDTO
  extends SearchQueryDTO
  implements Readonly<SearchMemberDTO> {}
