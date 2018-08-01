import {BodyType} from './bodyType';
import {CarModel} from './carModel';
import {Make} from './make';

export class Car {

  public id: number;

  public year: number;

  public mileage: number;

  public description: string;

  public created: Date;

  public updated: Date;

  public carModel: CarModel;

  public bodyType: BodyType;

  public make: Make;


}
