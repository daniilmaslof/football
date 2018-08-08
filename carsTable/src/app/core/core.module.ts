import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CarResolver } from './services/car.resolver';
import { CarsDatasourceService } from './services/cars.datasource.service';
import { CarsService } from './services/cars.service';
import { MapperCarsService } from './services/mapper-cars.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [CarResolver, CarsService , CarsDatasourceService, MapperCarsService],
  declarations: [],
})

export class CoreModule {
}
