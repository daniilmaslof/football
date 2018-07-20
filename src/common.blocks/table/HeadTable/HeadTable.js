const ArrayCarFieldTableHead = [];

/**
 *Add static data Field Car Table.
 */
ArrayCarFieldTableHead.push(
  new FieldCarTable('body_type', true, field => field.name, 3, null, false),
);
ArrayCarFieldTableHead.push(new FieldCarTable('make', true, field => field.name, 1, null, false));
ArrayCarFieldTableHead.push(
  new FieldCarTable('car_model', true, field => field.name, 2, null, false),
);
ArrayCarFieldTableHead.push(new FieldCarTable('id', false, field => field));
ArrayCarFieldTableHead.push(new FieldCarTable('year', false, field => field, 4));
ArrayCarFieldTableHead.push(new FieldCarTable('mileage', false, field => field, 5));
ArrayCarFieldTableHead.push(
  new FieldCarTable('description', false, field => field, 6, 'table-td--description'),
);
ArrayCarFieldTableHead.push(
  new FieldCarTable('created_at', false, field => moment(field).format('MM.DD, h:mm'), 7),
);
ArrayCarFieldTableHead.push(
  new FieldCarTable('updated_at', false, field => moment(field).format('MM.DD, h:mm'), 8),
);
ArrayCarFieldTableHead.push(new FieldCarTable('body_type_id', false, field => field));
ArrayCarFieldTableHead.push(new FieldCarTable('make_id', false, field => field));
ArrayCarFieldTableHead.push(new FieldCarTable('car_model_id', false, field => field));
ArrayCarFieldTableHead.push(new FieldCarTable('car_make', false, field => field));

/**
 *class HeadTable may create  car table head  is equal to the fields in the array Car Field in ArrayCarFieldTableHead.
 */
class HeadTable {
  /**
   * Creates  column head  by sorted fields by orderInHtml.
   */
  constructor() {
    this.sortedColumnNames = ArrayCarFieldTableHead.filter(field => field.orderInHtml).sort(
      (fieldPrevious, fieldCurrent) => fieldPrevious.orderInHtml > fieldCurrent.orderInHtml,
    );
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

    this.sortedColumnNames.forEach(columnName => {
      headTableDom.appendChild(this.createCellColumn(columnName));
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
        this.sortTableByColumn.bind(this, columnField.fieldName),
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
