import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { concat, map, retryWhen, switchMap, take } from 'rxjs/operators';
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
   * @param router if error 401 redirect to login.
   */
  constructor(private httpClient: HttpClient, private mapper: MapperCarsService, private router: Router) {

  }

  /**
   * Create http get query with Http params equal to the parameters of the function.
   *
   * @param paramsTableActions -(pagination,sort,filter) cast to Http params.
   * @return Observable with ICarsApi(cars and pagination).
   */
  public getCars(paramsTableActions: ParamsTableActions): Observable<TableCars<Car>> {
    return this.httpClient.get<ICarDto[]>('https://backend-jscamp.saritasa-hosting.com/api/cars',
      { params: this.mapper.parseParamsActionTableToHttpParamsDto(paramsTableActions) }).pipe(
      map((data: any) => {
        return <TableCars<Car>>{
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
    let url = 'https://backend-jscamp.saritasa-hosting.com/api/cars';
    if (localStorage.getItem('token')) {
      url = 'https://backend-jscamp.saritasa-hosting.com/api/with-auth/cars';
    }
    return this.httpClient.post(url, this.mapper.parseCartoCarDto(car)).pipe(
      map((carDto: ICarDto) => {
        return this.mapper.parseToCar(carDto);
      }),
    retryWhen(errors => {
        return this.handledHttpErrorCars(errors);
      },
    ),
    );
  }

  /**
   * Create http put query with car.
   *
   * @param car you want to send to API.
   * @return Observable with Car you send.
   */
  public putCar(car: Car): Observable<Car> {
    let url = 'https://backend-jscamp.saritasa-hosting.com/api/cars';
    if (localStorage.getItem('token')) {
      url = 'https://backend-jscamp.saritasa-hosting.com/api/with-auth/cars';
    }
    return this.httpClient.put(url + `/${car.id}`, this.mapper.parseCartoCarDto(car)).pipe(
      map((carDto: ICarDto) => {
        return this.mapper.parseToCar(carDto);
      }),
      retryWhen(errors => {
          return this.handledHttpErrorCars(errors);
        },
      ),
    );
  }

  /**
   * What to do if there are errors on http request, if error 401 redirect to login(is normal?).
   * although jwt has lifetime and move this login in guard.
   *
   * Can I create a storage class observable operators for example this method to use somewhere?
   *
   * @param errors - observable containing http Error Response .
   * @return Observable with error if error could not be resolved.
   */
  public handledHttpErrorCars(errors: Observable<any>): Observable<any> {
    return errors.pipe(
      switchMap((httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse.status === 503) {
          return Observable.of(true);
        }
        if (httpErrorResponse.status === 401) {
          this.router.navigateByUrl('/login');
        }
        return Observable.throwError(`${httpErrorResponse.error.message}`);
      }),
      take(5),
      concat(Observable.throwError(`please wait, server error 503`)),
    );
  }
}
