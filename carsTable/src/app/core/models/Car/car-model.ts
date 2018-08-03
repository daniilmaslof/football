/**
 *  Model  car.
 */
export class CarModel {
  /**
   * ID CarModel.
   */
  public id: number;
  /**
   * Name CarModel.
   */
  public name: string;
  /**
   * ID make who produces this Car Model.
   */
  public makeId: number;

  constructor(id: number, name: string, makeId: number) {
    this.id = id;
    this.name = name;
    this.makeId = makeId;
  }
}
