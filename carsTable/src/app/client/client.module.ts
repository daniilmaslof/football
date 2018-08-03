import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatInputModule, MatPaginatorIntl,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CarsMatPaginatorIntl} from './components/intl/cars-mat-paginator-intl';
import {TableComponent} from './components/table/table.component';
/**
 * Standard module.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: MatPaginatorIntl, useClass: CarsMatPaginatorIntl}],
  exports: [TableComponent],
  declarations: [TableComponent],
})
export class ClientModule {
}
