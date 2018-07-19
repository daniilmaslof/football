let URL = 'https://backend-jscamp.saritasa-hosting.com/api/cars';

class TableCars {
  constructor() {
    this.cars = [];
    this.generateTableBody = this.generateTableBody.bind(this);
    this.tableBody = null;
    this.tablePaginator = null;
  }

  createTable() {
    const table = document.querySelector('table');
    table.classList.add('table');
    let tableHead = new HeadTable();
    table.appendChild(tableHead.createrDomHeadTable());
  }

  /**
   * Create Table dom elements with data table.
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

      this.cars.push(rowTable.car);
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
 * Run after load pages and load cars?page1.
 */
const tableCars = new TableCars();
const loaderTable = new Loader();

function onLoad() {
  tableCars.createTable();
  TableCars.loadTable(URL, tableCars);
  const search = document.querySelector('.search-input');
  const button = document.querySelector('.search-submit');
  button.addEventListener('click', searchInTable);
}

function searchInTable() {
  let paramsUrl = URL.split(/[&?]/);
  const search = document.querySelector('.search-input');
  URL = paramsUrl[0] + `?keyword=${search.value}` + paramsUrl.filter(param => param.includes('order')).join('&');
  TableCars.loadTable(URL);
}