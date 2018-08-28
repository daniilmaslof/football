import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarResolver } from '../core/services/car.resolver';
import { DeactivateFormGuard } from '../core/services/deactivate-form.guard';
import { EnsureAuthenticatedGuard } from '../core/services/ensure-authenticated.guard';

import { FormCarComponent } from './components/form-car/form-car.component';
import { LoginComponent } from './components/login/login.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  {
    path: 'table',
    component: TableComponent,
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
