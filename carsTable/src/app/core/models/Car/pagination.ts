import {Links} from './links';

export class Pagination {
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  links: Links;
}
