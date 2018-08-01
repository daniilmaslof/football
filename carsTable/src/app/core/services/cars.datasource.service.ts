import {CollectionViewer} from '@angular/cdk/collections';
import {DataSource} from '@angular/cdk/table';
import {Injectable} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs/Rx';

import {Car} from '../models/Car/car';
import {Pagination} from '../models/Car/pagination';

import {CarsService} from './cars.service';

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

  public loading$ = this.loadingSubject.asObservable();
  public pagination$ = this.paginationSubject.asObservable();

  constructor(private carsService: CarsService) {

  }

  /**
   * This method will be called once by the Data Table at table bootstrap time.
   * The Data Table expects this method to return an Observable,
   * and the values of that observable contain the data that the Data Table needs to display.
   *
   * @param collectionViewer provides an Observable that emits information about what data is being displayed
   * @return carsSubject  That subject (the carsSubject) is going to be emitting the values retrieved from the backend.
   */
  connect(collectionViewer: CollectionViewer): Observable<Car[]> {
    console.log('Connecting data source');
    return this.carsSubject.asObservable();
  }

  /**
   * This method is called once by the data table at component destruction time.
   * Complete any observables that we have created internally in this class.
   */
  disconnect(collectionViewer: CollectionViewer): void {
    this.carsSubject.complete();
    this.loadingSubject.complete();
    this.paginationSubject.complete();
  }

/**
 * This method is going to be called in response to multiple user actions (pagination, sorting, filtering) to load a given data page.
 * @param filter - Data that the user entered to filter the table.
 * @param pageIndex Data about the table page.
 * @param fieldNameOrder Column name to sort.
 * @param sortOrder Parameter in which direction to sort.
 */
loadCars(filter: string = null,
         pageIndex: number = 0,
         fieldNameOrder: string = null,
         sortOrder: string = null): void {
    this.loadingSubject.next(true);

    this.carsService.getCars(filter, pageIndex, fieldNameOrder, sortOrder).pipe(
      finalize(() => this.loadingSubject.next(false)))
      .subscribe(carsApi => {
        this.carsSubject.next(carsApi.cars);
        this.paginationSubject.next(carsApi.pagination);
      });

  }
}
