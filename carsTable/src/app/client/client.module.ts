import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatDialogModule, MatFormFieldModule,
  MatInputModule, MatPaginatorIntl,
  MatPaginatorModule,
  MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClientRoutingModule } from './client-routing.module';
import { DialogDeactivationComponent } from './components/dialog-deactivation/dialog-deactivation.component';
import { FormCarComponent } from './components/form-car/form-car.component';
import { LoginComponent } from './components/login/login.component';
import { TableComponent } from './components/table/table.component';
import { CarsMatPaginatorIntl } from './intl/cars-mat-paginator-intl';

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
    ClientRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CarsMatPaginatorIntl }],

  declarations: [TableComponent, FormCarComponent, LoginComponent, DialogDeactivationComponent],
  entryComponents: [DialogDeactivationComponent, LoginComponent],
})
export class ClientModule {
}
