import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarResolver } from '../core/services/car.resolver';
import { DeactivateFormGuard } from '../core/services/deactivate-form.guard';
import { EnsureAuthenticatedGuard } from '../core/services/ensure-authenticated.guard';

import { FormCarComponent } from './components/form-car/form-car.component';
import { LoginComponent } from './components/login/login.component';
import { TableComponent } from './components/table/table.component';
import { TeamsComponent } from "./components/teams/teams.component";
import { FormTeamComponent } from "./components/form-team/form-team.component";
import { TeamResolver } from "../core/services/team.resolver";

const routes: Routes = [
  {
    path: 'table',
    component: TableComponent,
  },
  {
    path: 'teams',
    component: TeamsComponent,
  },
  {
    path: 'formCar',
    component: FormCarComponent,
    resolve: { carResolver: CarResolver },
    canDeactivate: [DeactivateFormGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'teamForm',
    resolve: { teamResolver: TeamResolver },
    component: FormTeamComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ClientRoutingModule {
}
