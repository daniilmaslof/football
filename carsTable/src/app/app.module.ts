import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';

import {CoreModule} from './core/core.module';

import {SharedModule} from './shared/shared.module';

import {AppComponent} from './app.component';
import {ClientModule} from './client/client.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    CoreModule,
    SharedModule,
    ClientModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
