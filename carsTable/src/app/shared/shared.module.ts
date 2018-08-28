import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {
  MatButtonModule, MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatSelectModule, MatSidenavModule,
  MatSortModule,
  MatTableModule, MatTabsModule, MatToolbarModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatTabsModule,
    MatSidenavModule,
    MatProgressBarModule,
  ],
  declarations: [],
  exports: [
    FormsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    NgxPermissionsModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatProgressBarModule,
  ],
})
export class SharedModule {
}
