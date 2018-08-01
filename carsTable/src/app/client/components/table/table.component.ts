import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Rx';

import {CarsDatasourceService} from '../../../core/services/cars.datasource.service';
import {CarsService} from '../../../core/services/cars.service';

/**
 necessary to break the component into components
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  dataSource: CarsDatasourceService;
  /**
   * Need create component mat Column Def and put it there when adding a form.
   */
  parseFieldCarForTable: Object = {
    'id': field => field,
    'make': field => field.name,
    'carModel': field => field.name,
    'bodyType': field => field.name,
    'year': field => field,
    'mileage': field => field,
    'description': field => field,
    'created': field => field,
    'updated': field => field,
  };
  /**
   * matHeaderRowDef enumeration of column names that we want to display Table.
   */
  displayedColumns: string[] = [
    'id',
    'make',
    'carModel',
    'bodyType',
    'year',
    'mileage',
    'description',
    'created',
    'updated',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('inputFilter') inputFilter: ElementRef;

  constructor(private carsService: CarsService) {
  }

  /**
   * We give the server from which the data download is called,and cause loading of the table data.
   */
  ngOnInit(): void {
    this.dataSource = new CarsDatasourceService(this.carsService);
    this.dataSource.loadCars();
  }

  /**
   * We give the server from which the data download is called,and cause loading of the table data.
   */
  ngAfterViewInit(): void {

    /**
     * Subscribe to changes sorting,and filtering ,and loading and redrawing the table if they occurred.
     * need to add switchMap and merge observable into one.
     */
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.loadLessonsPage();
    });

    Observable.fromEvent(this.inputFilter.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadLessonsPage();
        })).subscribe();
  }

  /**
   * This method is going to be called in response to multiple user actions pagination, sorting, filtering,
   * and loadCars with data from pagination ,MatSort Table, and input.
   */
  loadLessonsPage(): void {
    this.dataSource.loadCars(
      this.inputFilter.nativeElement.value,
      this.paginator.pageIndex,
      this.sort.active,
      this.sort.direction,
    );
  }

}
