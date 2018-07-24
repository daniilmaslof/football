/**
 * FieldCarTable - model Field Car .
 */
class FieldCarTable {
  /**
   * Creates static properties Field Car Table.
   *
   * @param {string} fieldNameServer -Name matches the name on the server.
   * @param {string} fieldName -Name field on the code  .
   * @param {boolean} edit Cells =to be links to edit page.
   * @param {Function} parsingFromServer Function shows how to parse  the data from the server.
   * @param {string} classCellField -Cell class in columns in the table.
   * @param {boolean} sortable This field can be sorted.
   */
  constructor(
    fieldNameServer,
    fieldName = fieldNameServer,
    edit,
    parsingFromServer,
    classCellField = 'table-td',
    sortable = true,
  ) {
    this.fieldNameServer = fieldNameServer;
    this.fieldName = fieldName;
    this.edit = edit;
    this.parsingFromServer = parsingFromServer;
    this.classCellField = classCellField;
    this.sortable = sortable;
  }

  /**
   * Creates dynamic properties Field Car Table and parsing value From Server.
   *
   * @param {Object} value -Value from the server.
   * @returns {FieldCarTable} .
   */
  setDynamicData(value) {
    this.value = value;
    this.parsingValue = this.parsingFromServer(value);

    return this;
  }
}

const ArrayCarFieldTableHead = [];

/**
 *Add static data Field Car Table.
 */
ArrayCarFieldTableHead.push(new FieldCarTable('body_type', 'bodyType', true, field => field.name, undefined,false));
ArrayCarFieldTableHead.push(new FieldCarTable('make', 'make', true, field => field.name, undefined,false));
ArrayCarFieldTableHead.push(new FieldCarTable('car_model', 'carModel', true, field => field.name, undefined,false));
ArrayCarFieldTableHead.push(new FieldCarTable('id', 'id', false, field => field));
ArrayCarFieldTableHead.push(new FieldCarTable('year', 'year', false, field => field));
ArrayCarFieldTableHead.push(new FieldCarTable('mileage', 'mileage', false, field => field));
ArrayCarFieldTableHead.push(
  new FieldCarTable('description', 'description', false, field => field, 'table-td--description'),
);
ArrayCarFieldTableHead.push(
  new FieldCarTable('created_at', 'createdAt', false, field => moment(field).format('MM.DD, h:mm')),
);
ArrayCarFieldTableHead.push(
  new FieldCarTable('updated_at', 'updatedAt', false, field => moment(field).format('MM.DD, h:mm')),
);
ArrayCarFieldTableHead.push(new FieldCarTable('body_type_id', 'bodyTypeId', true, field => field));
ArrayCarFieldTableHead.push(new FieldCarTable('make_id', 'makeId', true, field => field));
ArrayCarFieldTableHead.push(new FieldCarTable('car_model_id', 'carModelId', true, field => field));
ArrayCarFieldTableHead.push(new FieldCarTable('car_make', 'car_make', false, field => field));