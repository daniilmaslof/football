const CAR_TABLE_FIELDS = [
  'make',
  'carModel',
  'bodyType',
  'year',
  'mileage',
  'description',
  'createdAt',
  'updatedAt',
];

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
      const fieldCar = ArrayCarFieldTableHead.find(field => field.fieldNameServer === fieldName);

      if (fieldCar) {
        fieldCar.setDynamicData(carObject[fieldName]);
        this[fieldCar.fieldName] = fieldCar;
      } else this[fieldName] = carObject[fieldName];

      return null;
    });
  }
}
