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
import { MaterialModule } from "./material/material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    NgxPermissionsModule,
    BrowserAnimationsModule,
  ],
  declarations: [],
  exports: [
    FormsModule,
    MaterialModule,
    MatTabsModule,
    BrowserAnimationsModule,
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
