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

import { TeamsTableComponent } from './components/teams-table/teams-table.component';
import { TeamsComponent } from "./components/teams/teams.component";
import { SharedModule } from "../shared/shared.module";
import { FormTeamComponent } from './components/form-team/form-team.component';
import { MatchComponent } from './components/match/match.component';
import { MatchesComponent } from './components/matches/matches.component';
import { TournamentTableComponent } from './components/tournament-table/tournament-table.component';

/**
 * Standard module.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
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

  declarations: [TableComponent, FormCarComponent, LoginComponent, DialogDeactivationComponent, TeamsComponent, TeamsTableComponent, FormTeamComponent, MatchComponent, MatchesComponent, TournamentTableComponent],
  entryComponents: [DialogDeactivationComponent, LoginComponent],
})
export class ClientModule {
}
