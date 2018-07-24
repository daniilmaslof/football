/**
 * Class Row Table may create row table and cell row and  interact with it.
 */
class RowTable {
  /**
   * Creates dom a row table and add Event click.
   * Create object class Car by the data from the server.
   *
   * @param {Object} rowData Data without parsing.
   */
  constructor(rowData) {
    this.car = new Car(rowData);
    this.rowDomElment = document.createElement('tr');
  }

  /**
   * Create Dom Row Table.
   *
   * @returns {Object} Return Dom Row.
   */
  createDomRowTable() {
    this.rowDomElment.classList.add('table-tr');
    CAR_TABLE_FIELDS.forEach(field => {
      this.rowDomElment.appendChild(this.createCellTable(this.car[field]));
    });

    return this.rowDomElment;
  }

  /**
   * Create Dom Cell Table with text.
   *
   * @param {FieldCarTable} fieldsCarInColumn Text Cell.
   * @param {string} fieldsCarInColumn.classCellField Class Cell.
   * @param {boolean} fieldsCarInColumn.edit Cells =to be links to edit page.
   * @returns {Object} Cell Dom .
   */
  createCellTable(fieldsCarInColumn) {
    const cell = document.createElement('td');

    if (fieldsCarInColumn.classCellField) cell.classList.add(fieldsCarInColumn.classCellField);

    if (fieldsCarInColumn.edit) {
      const a = document.createElement('a');

      a.href = `../form/form.html?id=${this.car.id.value}`;
      a.appendChild(document.createTextNode(fieldsCarInColumn.parsingValue));
      cell.appendChild(a);
    } else cell.appendChild(document.createTextNode(fieldsCarInColumn.parsingValue));

    return cell;
  }
}
