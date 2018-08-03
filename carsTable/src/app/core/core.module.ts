import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CarsDatasourceService } from './services/cars.datasource.service';
import { CarsService } from './services/cars.service';
import { MapperCarsService } from './services/mapper-cars.service';

/**
 * Core module.
 */

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [{ provide: CarsService, useClass: CarsService }, CarsDatasourceService, MapperCarsService],
  declarations: [],
})

export class CoreModule {
}
