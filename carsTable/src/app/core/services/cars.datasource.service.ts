import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { finalize, retryWhen, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import { Car } from '../models/Car/car';
import { Pagination } from '../models/Car/pagination';
import { ParamsTableActions } from '../models/Car/params-table-actions';

import { CarsService } from './cars.service';

/**
 * Class custom Observable-based Angular CDK Data Source.
 * We will not be using the built-in MatTableDataSource because it is use of a client-side data array.
 */
@Injectable({
  providedIn: 'root',
})
export class CarsDatasourceService implements DataSource<Car> {
  private carsSubject = new BehaviorSubject<Car[]>([]);
  private paginationSubject = new BehaviorSubject<Pagination>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  /**
   * Is the table loaded?.
   */
  public loading$ = this.loadingSubject.asObservable();
  /**
   * provides pagination of the table?.
   */
  public pagination$ = this.paginationSubject.asObservable();

  /**
   * In the constructor service which receives the data in the table requests data occurs after actionsChangeTable emits values.
   *
   * @param carsService Service that sends data to the table in our case CarsService.
   * @param $actionsChangeTable -ParamsTableActions come whenever one of three events occurs(change Page, sort change , search).
   */
  constructor(private carsService: CarsService, $actionsChangeTable: Subject<ParamsTableActions>) {
    $actionsChangeTable.pipe(
      tap(() => this.loadingSubject.next(true)),
      switchMap(value =>
        this.carsService.getCars(value).pipe(
          retryWhen(errors => {
              return errors;
            },
          ),
          finalize(() => this.loadingSubject.next(false)),
        )),
    ).subscribe(carsApi => {
      this.carsSubject.next(carsApi.cars);
      this.paginationSubject.next(carsApi.pagination);
    });
  }

  /**
   * This method will be called once by the Data Table at table bootstrap time.
   * The Data Table expects this method to return an Observable,
   * and the values of that observable contain the data that the Data Table needs to display.
   *
   * @param collectionViewer provides an Observable that emits information about what data is being displayed
   * @return carsSubject  That subject (the carsSubject) is going to be emitting the values retrieved from the backend.
   */
  public connect(collectionViewer: CollectionViewer): Observable<Car[]> {
    console.log('Connecting data source');
    return this.carsSubject.asObservable();
  }

  /**
   * Complete any observables that we have created internally in this class.
   * This method is called once by the data table at component destruction time.
   */
  public disconnect(collectionViewer: CollectionViewer): void {
    this.carsSubject.complete();
    this.loadingSubject.complete();
    this.paginationSubject.complete();
  }
}
