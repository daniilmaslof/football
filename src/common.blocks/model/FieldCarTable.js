/**
 * FieldCarTable - model Field Car .
 */
class FieldCarTable {
  /**
   * Creates static properties Field Car Table.
   *
   * @param {string} fieldName -Name matches the name on the server.
   * @param {boolean} edit Cells =to be links to edit page.
   * @param {Function} parsingFromServer Function shows how to parse  the data from the server.
   * @param {string} classCellField -Cell class in columns in the table.
   * @param {boolean} sortable This field can be sorted.
   */
  constructor(fieldName, edit, parsingFromServer, classCellField = 'table-td', sortable = true) {
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
