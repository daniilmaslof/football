import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {
  MatButtonModule,
  MatInputModule,
  MatPaginatorModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatSidenavModule,
  MatSortModule,
  MatTableModule, MatTabsModule, MatToolbarModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxPermissionsModule } from 'ngx-permissions';

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
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    NgxPermissionsModule,
    MatTabsModule,
    MatButtonModule,
    MatSidenavModule,
    MatProgressBarModule,
  ],
})
export class SharedModule {
}
