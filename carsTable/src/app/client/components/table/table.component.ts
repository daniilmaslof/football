import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent, Sort } from '@angular/material';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { ParamsTableActions } from '../../../core/models/Car/params-table-actions';
import { CarsDatasourceService } from '../../../core/services/cars.datasource.service';
import { CarsService } from '../../../core/services/cars.service';

/**
 * Component with table car.
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  private dataSource: CarsDatasourceService;
  private $actionsChangeTable: Subject<ParamsTableActions> = new Subject<ParamsTableActions>();
  private carHttpParams: ParamsTableActions = new ParamsTableActions();
  /**
   * Need create component mat Column Def and put it there when adding a form.
   */
  private parseFieldCarForCellTable: { [keyField: string]: Function } = {
    'id': field => field,
    'make': field => field.name,
    'carModel': field => field.name,
    'bodyType': field => field.name,
    'year': field => field,
    'mileage': field => field,
    'description': field => field,
    'created': field => new DatePipe('en-US').transform(field, 'yyyy-dd-MM-hh'),
    'updated': field => new DatePipe('en-US').transform(field, 'yyyy-dd-MM-hh'),
  };
  /**
   * matHeaderRowDef enumeration of column names that we want to display Table.
   */
  private displayedColumns: string[] = [
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
  private searchField: FormControl;

  /**
   * The server from which data is received into the table.
   */
  constructor(private carsService: CarsService) {
  }

  /**
   * Create CarsDatasourceService which provides data to a table, who receives them at $actionsChangeTable emit change of carsService.
   */
  public ngOnInit(): void {
    this.changeSearchInput();
    this.dataSource = new CarsDatasourceService(this.carsService, this.$actionsChangeTable);
    this.$actionsChangeTable.next(this.carHttpParams);
  }

  /**
   When the user clicks the sort buttons,$actionsChangeTable emit carHttpParams with  sort changes data.
   */
  public sortTableChange(eventSort: Sort): void {
    this.carHttpParams.sortParams.sortOrder = eventSort.direction;
    this.carHttpParams.sortParams.orderBy = eventSort.active;
    this.$actionsChangeTable.next(this.carHttpParams);
  }

  /**
   When the user change page table,$actionsChangeTable emit carHttpParams with  page changes data.
   */
  public changePage(eventPageIndex: PageEvent): void {
    this.carHttpParams.page = eventPageIndex.pageIndex + 1;
    this.$actionsChangeTable.next(this.carHttpParams);
  }

  /**
   When the user change search field table,$actionsChangeTable emit carHttpParams with  search changes data.
   */
  public changeSearchInput(): void {
    this.searchField = new FormControl();
    this.searchField.valueChanges.pipe(
      debounceTime(150),
      distinctUntilChanged(),
    ).subscribe(
      (value: string) => {
        this.carHttpParams.keyword = value;
        this.$actionsChangeTable.next(this.carHttpParams);
      },
    );
  }

}
