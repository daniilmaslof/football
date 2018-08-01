import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatInputModule, MatPaginatorIntl,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {TableComponent} from './components/table/table.component';
import {CarsMatPaginatorIntl} from './components/intl/carsMatPaginatorIntl.';

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
  ],
  providers: [{provide: MatPaginatorIntl, useClass: CarsMatPaginatorIntl}],
  exports: [TableComponent],
  declarations: [TableComponent],
})
export class ClientModule {
}
