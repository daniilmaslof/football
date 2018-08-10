/**
 * Pagination  table car.
 */
export class Pagination {

  /**
   * Total number item(cars) in the table.
   */
  public total: number;
  /**
   * Total amount available now on the page items(car) .
   */
  public count: number;
  /**
   * Total amount on the page items(car) .
   */
  public perPage: number;
  private _currentPage: number;
  /**
   * Get current page in the table with indexing from one.
   */
  public get currentPage(): number {
    return this._currentPage;
  }
  /**
   * Set current page in the table with indexing from one.
   */
  public set currentPage(currentPage: number) {
    this._currentPage = currentPage - 1;
  }

  /**
   * Total number of pages in the table.
   */
  public totalPages: number;

}
