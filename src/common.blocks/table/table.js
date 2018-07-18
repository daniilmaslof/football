/**
 * Create Table dom elements with data table.
 *
 * @param {Object} data Data about table car.
 * @param {Array<Object>} data.results Array car.
 * @param {Object} data.pagination Pagination information.
 */
function generateTable(data) {
  const tblBody = document.querySelector('.table_tbody');

  data.results.forEach(rowData => {
    const rowTable = new RowTable(rowData);

    tblBody.appendChild(rowTable.createDomRowTable());
  });
  tblBody.parentNode.appendChild(createPaginator(data.pagination));
}
/**
 * Loads a table by link.
 *
 * @param {string} url  Api get Data table.
 */
function loadTable(url) {
  const loaderRow = new Loader();

  loaderRow.loadDatabyFetch(url, createCallback(generateTable, console.log));
}

/**
 * Run after load pages and load cars?page1.
 */
function onLoad() {
  loadTable('https://backend-jscamp.saritasa-hosting.com/api/cars');
}
