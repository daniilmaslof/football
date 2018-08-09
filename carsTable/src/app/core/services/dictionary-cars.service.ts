import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { concat, map, retryWhen, shareReplay, switchMap, take } from 'rxjs/operators';

import { ElementDictionariesRelatedWithCar } from '../models/Car/element-dictionaries-related-with-car';

/**
 * Service communication with http server https://backend-jscamp.saritasa-hosting.com/api/dictionaries.
 */
@Injectable({
  providedIn: 'root',
})
export class DictionaryCarsService {
  private cacheMake$: Observable<Array<ElementDictionariesRelatedWithCar>>;
  private cacheBodyType$: Observable<Array<ElementDictionariesRelatedWithCar>>;

  /**
   * @param httpClient Servise with http communication.
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get observable with dictionary make from  can the cache.
   * Cache decided not yet how not to update.
   *
   * @return Observable with  List Make(id,name).
   */
  public getMake(): Observable<Array<ElementDictionariesRelatedWithCar>> {
    if (!this.cacheMake$) {
      this.cacheMake$ = this.httpClient
        .get<Array<ElementDictionariesRelatedWithCar>>('https://backend-jscamp.saritasa-hosting.com//api/dictionaries/makes')
        .pipe(
          retryWhen(errors => {
              return this.handledHttpErrorDictionaryCar(errors);
            },
          ),
          map((response: any) => response.results),
          shareReplay(1),
        )
      ;
    }

    return this.cacheMake$;
  }
  /**
   * Get observable with dictionary( body type from  can the cache.
   * Cache decided not yet how not to update.
   *
   * @return Observable with  Body Type(id,name).
   */
  public getBodyType(): Observable<Array<ElementDictionariesRelatedWithCar>> {
    if (!this.cacheBodyType$) {
      this.cacheBodyType$ = this.httpClient
        .get<Array<ElementDictionariesRelatedWithCar>>('https://backend-jscamp.saritasa-hosting.com//api/dictionaries/body-types')
        .pipe(
          retryWhen(errors => {
              return this.handledHttpErrorDictionaryCar(errors);
            },
          ),
          map((response: any) => response.results),
          shareReplay(1),
        );
    }

    return this.cacheBodyType$;
  }

  /**
   * Get observable with dictionary model.
   *
   * @param idMake loads the models of the given Make.
   * @return Observable with  Model(id,name).
   */
  public getModel(idMake: number): Observable<Array<ElementDictionariesRelatedWithCar>> {
    return this.httpClient
      .get<Array<ElementDictionariesRelatedWithCar>>(`https://backend-jscamp.saritasa-hosting.com//api/dictionaries/makes/${idMake}/models`)
      .pipe(
        map((response: any) => response.results),
        retryWhen(errors => {
            return this.handledHttpErrorDictionaryCar(errors);
          },
        ));
  }

  /**
   * shows what to do if there are errors on http communication.
   *
   * @param errors - observable containing http Error Response .
   * @return Observable with error if error could not be resolved.
   */
  public handledHttpErrorDictionaryCar(errors: Observable<any>): Observable<any> {
    return errors.pipe(
      switchMap(httpErrorResponse => {
        if (httpErrorResponse.status === 503) {
          return Observable.of(true);
        }
        return Observable.throwError(`${httpErrorResponse.error.message}`);
      }),
      take(5),
      concat(Observable.throwError(`server error 503`)),
    );
  }
}
