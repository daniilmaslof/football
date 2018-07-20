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
    this.rowDomElment.addEventListener('click', this.click.bind(this));
  }

  /**
   * Create Dom Row Table.
   *
   * @returns {Object} Return Dom Row.
   */
  createDomRowTable() {
    const sortedFieldsCarInColumn = Object.entries(this.car)
      .filter(field => field[1].orderInHtml)
      .sort(
        (fieldPrevious, fieldCurrent) => fieldPrevious[1].orderInHtml > fieldCurrent[1].orderInHtml,
      )
      .map(fieldCar => fieldCar[1]);

    this.rowDomElment.classList.add('table-tr');
    sortedFieldsCarInColumn.forEach(FieldsCarInColumn => {
      this.rowDomElment.appendChild(this.createCellTable(FieldsCarInColumn));
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

      a.href = `${this.car.id.value} `;
      a.appendChild(document.createTextNode(fieldsCarInColumn.parsingValue));
      cell.appendChild(a);
    } else cell.appendChild(document.createTextNode(fieldsCarInColumn.parsingValue));

    return cell;
  }

  /**
   * Function callback Event Click row.
   *
   */
  click() {
    console.log(this.car.id);
  }
}
