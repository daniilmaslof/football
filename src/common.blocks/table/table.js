let Url = 'https://backend-jscamp.saritasa-hosting.com/api/cars';
const loaderTable = new Loader();

/**
 * Table Car elements may create table Head Body Paginatar.
 */
class TableCars {
  constructor() {
    this.generateTableBody = this.generateTableBody.bind(this);
    this.tableBody = null;
    this.tablePaginator = null;
  }

  /**
   * Create Table Head.
   */
  createTableHead() {
    const table = document.querySelector('table');

    table.classList.add('table');

    const tableHead = new HeadTable();

    table.appendChild(tableHead.createrDomHeadTable());
  }

  /**
   * Create paginator and table dom elements with data table.
   *
   * @param {Object} data Data about table car.
   * @param {Array<Object>} data.results Array car.
   * @param {Object} data.pagination Pagination information.
   */
  generateTableBody(data) {
    if (this.tableBody) {
      this.tableBody.remove();
      this.tableBody = null;
    }
    this.tableBody = document.createElement('tbody');
    this.tableBody.classList.add('table-tableBody');

    const table = document.querySelector('table');

    data.results.forEach(car => {
      const rowTable = new RowTable(car);

      this.tableBody.appendChild(rowTable.createDomRowTable());
    });
    table.appendChild(this.tableBody);
    if (this.tablePaginator) document.querySelector('.paginator').remove();

    this.tablePaginator = createPaginator(data.pagination);
    table.appendChild(this.tablePaginator);
  }

  /**
   * Loads a table by link.
   *
   * @param {string} url  Api get Data table.
   */
  static loadTable(url) {
    loaderTable.loadDatabyFetch(url, createCallback(tableCars.generateTableBody, console.log));
  }
}

/**
 * Create query to load Table with keyword search input.
 */
function searchInTable() {
  const paramsUrl = Url.split(/[&?]/);

  const search = document.querySelector('.search-input');

  if (!Url.includes('?')) Url += `?keyword=${search.value}`;
  else
    Url =
      paramsUrl[0] +
      '?' +
      paramsUrl.filter(param => param.includes('order')).join('&') +
      `&keyword=${search.value}`;
  TableCars.loadTable(Url);
}

const tableCars = new TableCars();

/**
 * Run after load pages and load cars?page1.
 */
function onLoad() {
  tableCars.createTableHead();
  TableCars.loadTable(Url, tableCars);

  const button = document.querySelector('.search-submit');

  button.addEventListener('click', searchInTable);
}
