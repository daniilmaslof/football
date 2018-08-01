import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {CarsDatasourceService} from './services/cars.datasource.service';
import {CarsService} from './services/cars.service';
import {MapperService} from './services/mapper.service';

/**
 * Core module.
 */
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [{provide: CarsService, useClass: CarsService}, CarsDatasourceService, MapperService],
  declarations: [],
})
export class CoreModule {
}
