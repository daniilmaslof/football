import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthInterceptorService } from './core/services/auth-interceptor.service';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
    ),
  ],
  exports: [
    RouterModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  }],
})
export class AppRoutingModule {
}
