import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { Car } from '../models/Car/car';
import { Pagination } from '../models/Car/pagination';
import { ParamsTableActions } from '../models/Car/params-table-actions';

import { MapperCarsService } from './mapper-cars.service';

/**
 * Interface data coming from the server by get query using method getCars.
 */
export interface ICarsApi {
  cars: Car[];
  pagination: Pagination;
}

/**
 * Service communication service with http server https://backend-jscamp.saritasa-hosting.com/api/cars.
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
   * @return Observable with ICarsApi(cars and pagination).
   */
  public getCars(paramsTableActions: ParamsTableActions): Observable<ICarsApi> {
    return this.httpClient.get<ICarsApi>('https://backend-jscamp.saritasa-hosting.com/api/cars',
      { params: this.mapper.parseParamsActionTableToHttpParamsDto(paramsTableActions) }).pipe(
      map((data: any) => {
        return <ICarsApi>{
          cars: data.results.map(car => this.mapper.parseToCar(car)),
          pagination: this.mapper.parseToPagination(data.pagination),
        };
      }));
  }
}
