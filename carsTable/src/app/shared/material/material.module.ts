import { NgModule } from '@angular/core';

import {
  MatDialogModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatCheckboxModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressBarModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';

// Add any modules required from Angular Material.
const materialModules = [
  MatDialogModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatCheckboxModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressBarModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatInputModule,
];

/**
 * Specifies list of material modules used in the application.
 */
@NgModule({
  imports: [
    ...materialModules,
  ],
  exports: [
    ...materialModules,
  ],
})
export class MaterialModule { }
