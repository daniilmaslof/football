import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, map, switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';

import { Car } from '../models/Car/car';
import { ParamsTableActions } from '../models/Car/params-table-actions';
import { TableCars } from '../models/Car/table-cars';

import { ICarDto } from './dto-cars';
import { MapperCarsService } from './mapper-cars.service';

/**
 * Service communication with http server https://backend-jscamp.saritasa-hosting.com/api/cars.
 */
@Injectable({
  providedIn: 'root',
})
export class CarsService {

  /**
   * Injection HttpClient and MapperCarsService.
   *
   * @param httpClient standard Angular.
   * @param mapper Stores methods for conversion from and to DTO.
   */
  constructor(private httpClient: HttpClient, private mapper: MapperCarsService) {

  }

  /**
   * Create http get query with Http params equal to the parameters of the function.
   *
   * @param paramsTableActions -(pagination,sort,filter) cast to Http params.
   * @return Observable with ICarsApi(cars and pagination).
   */
  public getCars(paramsTableActions: ParamsTableActions): Observable<TableCars> {
    return this.httpClient.get<ICarDto[]>('https://backend-jscamp.saritasa-hosting.com/api/cars',
      { params: this.mapper.parseParamsActionTableToHttpParamsDto(paramsTableActions) }).pipe(
      map((data: any) => {
        return <TableCars>{
          items: data.results.map(car => this.mapper.parseToCar(car)),
          pagination: this.mapper.parseToPagination(data.pagination),
        };
      }));
  }

  /**
   * Create http get query with  id car.
   *
   * @return Observable with Car with this id.
   */
  public getCar(id: number): Observable<Car> {
    return this.httpClient.get<ICarDto>(`https://backend-jscamp.saritasa-hosting.com/api/cars/${id}`).pipe(
      map((carDto: ICarDto) => {
        return this.mapper.parseToCar(carDto);
      }));
  }

  /**
   * Create http post query with  car.
   *
   * @param car you want to send to API.
   * @return Observable with Car with this id.
   */
  public postCar(car: Car): Observable<Car> {
    return this.httpClient.post('https://backend-jscamp.saritasa-hosting.com/api/cars', this.mapper.parseCartoCarDto(car)).pipe(
      map((carDto: ICarDto) => {
        return this.mapper.parseToCar(carDto);
      }));
  }

  /**
   * Create http put query with car.
   *
   * @param car you want to send to API.
   * @return Observable with Car you send.
   */
  public putCar(car: Car): Observable<Car> {
    return this.httpClient.put(`https://backend-jscamp.saritasa-hosting.com/api/cars/${car.id}`, this.mapper.parseCartoCarDto(car)).pipe(
      map((carDto: ICarDto) => {
        return this.mapper.parseToCar(carDto);
      }));
  }

  /**
   * What to do if there are errors on http request.
   *
   * @param errors - observable containing http Error Response .
   * @return Observable with error if error could not be resolved.
   */
  public handledHttpErrorCars(errors: Observable<any>): Observable<any> {
    return errors.pipe(
      switchMap(httpErrorResponse => {
        if (httpErrorResponse.status === 503) {
          return Observable.of(true);
        }
        return Observable.throwError(`${httpErrorResponse.error.message}`);
      }),
      take(5),
      concat(Observable.throwError(`please wait, server error 503`)),
    );
  }
}
