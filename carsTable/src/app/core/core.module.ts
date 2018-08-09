import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CarResolver } from './services/car.resolver';
import { CarsDatasourceService } from './services/cars.datasource.service';
import { CarsService } from './services/cars.service';
import { DeactivateFormGuard } from './services/deactivate-form.guard';
import { EnsureAuthenticatedGuard } from './services/ensure-authenticated.guard';
import { LoginService } from './services/login.service';
import { MapperCarsService } from './services/mapper-cars.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [
    CarResolver,
    CarsService,
    CarsDatasourceService,
    MapperCarsService,
    LoginService,
    EnsureAuthenticatedGuard,
    DeactivateFormGuard,
  ],
  declarations: [],
})

export class CoreModule {
}
