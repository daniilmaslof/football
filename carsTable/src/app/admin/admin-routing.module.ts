import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './admin-page/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(
      routes,
    ),
  ],
  exports: [
    RouterModule,
  ],
})
export class AdminRoutingModule {
}
