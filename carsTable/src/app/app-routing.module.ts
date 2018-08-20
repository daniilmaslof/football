import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { AuthInterceptorService } from './core/services/auth-interceptor.service';

const routes: Routes = [
  {
    path: 'admin',
    data: {
      permissions: {
        only: 'ADMIN',
      },
    },
    canLoad: [NgxPermissionsGuard],
    loadChildren: 'app/admin/admin.module#AdminModule',
  },
];

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
