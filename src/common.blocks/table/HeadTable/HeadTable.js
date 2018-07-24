/**
 *class HeadTable may create  car table head  is equal to the fields in the array Car Field in ArrayCarFieldTableHead.
 */
class HeadTable {
  /**
   * Creates  column head  by sorted fields by orderInHtml.
   */
  constructor() {
    this.sort_order = null;
  }

  /**
   * Create dom table head with names from the ArrayCarFieldTableHead.
   *
   * @returns {Object} TableHead -DomElemet(thead).
   */
  createrDomHeadTable() {
    const tableHead = document.createElement('thead');

    tableHead.classList.add('table-thead');

    const headTableDom = document.createElement('tr');

    CAR_TABLE_FIELDS.forEach(columnName => {
      headTableDom.appendChild(
        this.createCellColumn(ArrayCarFieldTableHead.find(field => columnName === field.fieldName)),
      );
    });
    tableHead.appendChild(headTableDom);

    return tableHead;
  }

  /**
   * Create dom table head with names from the ArrayCarFieldTableHead.
   *
   * @param {FieldCarTable} columnField  It contains information about the class, name, is it possible to change,sort.
   * @returns {Object} DomElemet(th) with added addEventListener sort for elements that are sortable.
   */
  createCellColumn(columnField) {
    const columnCellDom = document.createElement('th');

    columnCellDom.classList.add('table-th');
    if (!columnField.sortable) {
      columnCellDom.appendChild(document.createTextNode(columnField.fieldName));
    } else {
      const buttonSort = document.createElement('button');

      buttonSort.type = 'button';
      buttonSort.classList.add('button--fullSize');
      buttonSort.classList.add('button--sort');
      buttonSort.appendChild(document.createTextNode(columnField.fieldName));
      buttonSort.addEventListener(
        'click',
        this.sortTableByColumn.bind(this, columnField.fieldNameServer),
      );
      columnCellDom.appendChild(buttonSort);
    }

    return columnCellDom;
  }

  /**
   * Create query to load Table containing link options order_by and sort_order.
   *
   * @param {string} columnName Name field car = order_by.
   */
  sortTableByColumn(columnName) {
    if (this.sort_order === 'asc') this.sort_order = 'desc';
    else this.sort_order = 'asc';

    const Url = new URL(url);

    Url.searchParams.delete('page');
    Url.searchParams.delete('order_by');
    Url.searchParams.delete('sort_order');
    Url.searchParams.append('order_by', columnName);
    Url.searchParams.append('sort_order', this.sort_order);
    url = Url.toString();
    TableCars.loadTable(Url);
  }
}
