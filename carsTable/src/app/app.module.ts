import {BrowserModule} from '@angular/platform-browser';

import {NgModule} from '@angular/core';

import {CoreModule} from './core/core.module';

import {SharedModule} from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';
import {ClientModule} from './client/client.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    ClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
