/**
 * Car create car with  fields Class FieldCarTable.
 */
class Car {
  /**
   * Create car with  fields Class FieldCarTable.
   *
   * @param {Object} carObject - Car from the server.
   */
  constructor(carObject) {
    this.createFieldsCar(carObject);
  }
  /**
   * Add all  FieldCarTable - DynamicData.
   *
   * @param {Object} carObject - Car from the server.
   */
  createFieldsCar(carObject) {
    Object.keys(carObject).forEach(fieldName => {
      const field = ArrayCarFieldTableHead.find(fieldColomn => fieldColomn.fieldName === fieldName);

      if (field) {
        field.setDynamicData(carObject[fieldName]);
        this[fieldName] = field;
      } else this[fieldName] = carObject[fieldName];

      return null;
    });
  }
}
