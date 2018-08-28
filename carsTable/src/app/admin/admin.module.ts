import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatListModule, MatIconModule, MatCardModule, MatMenuModule, MatInputModule, MatButtonToggleModule,
  MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatDialogModule, MatSnackBarModule, MatToolbarModule,
  MatTabsModule, MatSidenavModule, MatTooltipModule, MatRippleModule, MatRadioModule, MatGridListModule,
  MatDatepickerModule, MatNativeDateModule, MatSliderModule, MatAutocompleteModule,
} from '@angular/material';
import {
  CovalentCommonModule, CovalentLayoutModule, CovalentMediaModule, CovalentExpansionPanelModule,
  CovalentStepsModule, CovalentLoadingModule, CovalentDialogsModule, CovalentSearchModule, CovalentPagingModule,
  CovalentNotificationsModule, CovalentMenuModule, CovalentDataTableModule, CovalentMessageModule, CovalentVirtualScrollModule,
} from '@covalent/core';

import { UsersComponent } from './admin-page/users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UserFormComponent } from './admin-page/user/user-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatIconModule,
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentDataTableModule,
    CovalentExpansionPanelModule,
    CovalentVirtualScrollModule,
  ],
  declarations: [UsersComponent, UserFormComponent],
})
export class AdminModule {

}
