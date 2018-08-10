import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {
  MatButtonModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule, MatSidenavModule,
  MatSortModule,
  MatTableModule, MatTabsModule, MatToolbarModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
  ],
  declarations: [],
  exports: [
    FormsModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
})
export class SharedModule {
}
