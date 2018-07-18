const parserField = {
  make: field => field.name,
  car_model: field => field.name,
  body_type: field => field.name,
  year: field => field,
  mileage: field => field,
  description: field => field,
  created_at: field => field,
  updated_at: field => field,
};

/**
 * Class Row Table may create row table and cell row and  interact with it.
 */
class RowTable {
  /**
   * Create Dom Row Table.
   *
   * @returns {Object} Return Dom Row.
   */
  createDomRowTable() {
    this.rowDomElment.classList.add('table_tr');
    Object.keys(parserField).forEach(key => {
      const field = this.rowData[key];

      this.rowDomElment.appendChild(this.createCell(parserField[key](field)));
    });

    return this.rowDomElment;
  }
  /**
   * Creates dom a row table and add Event click.
   *
   * @param {Object} rowData Data without parsing.
   */
  constructor(rowData) {
    this.rowData = rowData;
    this.rowDomElment = document.createElement('tr');
    this.rowDomElment.addEventListener('click', this.click.bind(this));
  }

  /**
   * Create Dom Cell Table with text.
   *
   * @param {string} cellText Text Cell.
   * @returns {Object} Cell Dom Cell Table.
   */
  createCell(cellText) {
    const cell = document.createElement('td');

    cell.appendChild(document.createTextNode(cellText));

    return cell;
  }

  /**
   * Function callback Event Click row.
   *
   */
  click() {
    console.log(this.rowData.id);
  }
}
