import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

import {Car} from '../models/Car/car';
import {Pagination} from '../models/Car/pagination';

import {MapperService} from './mapper.service';

export interface CarsApi {
  cars: Car[];
  pagination: Pagination
}

@Injectable({
  providedIn: 'root',
})
export class CarsService {

  constructor(private httpClient: HttpClient, private mapper: MapperService) {

  }
  /**
   * Create http get query with Http params equal to the parameters of the function.
   *
   * @param filter  keyword Http params.
   * @param pageNumber page Http params.
   * @param fieldNameOrder  order_by Http params.
   * @param sortOrder sort_order  Http param.
   * @return Observable with cars and pagination.
   */
  public getCars(filter: string = null, pageNumber: number = 0, fieldNameOrder: string, sortOrder: string): Observable<CarsApi> {
    let params: HttpParams = new HttpParams();
    params = params.set('page', (pageNumber + 1).toString());
    if (filter) {
      params = params.set('keyword', filter);
    }
    if (fieldNameOrder) {
      params = params.set('order_by', fieldNameOrder);
    }
    if (sortOrder) {
      params = params.set('sort_order', sortOrder);
    }

    return this.httpClient.get<CarsApi>('https://backend-jscamp.saritasa-hosting.com/api/cars', {params: params}).pipe(
      map((data: any) => {
        return <CarsApi>{
          cars: data.results.map(car => this.mapper.parseToCar(car)),
          pagination: this.mapper.parseToPagination(data.pagination),
        };
      }));
  }
}
