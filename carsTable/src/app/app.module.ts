import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientModule } from './client/client.module';
import { CoreModule } from './core/core.module';
import { LoginService } from './core/services/login.service';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    NgxPermissionsModule.forRoot(),
    SharedModule,
    ClientModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    // To initialize AngularFire
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [{
    provide: APP_INITIALIZER,
    /**
     * Function that will be executed when an application is initialized and load a client role.
     */
    useFactory: (loginService: LoginService, ngxPermissionsService: NgxPermissionsService) => function() {
      loginService.getRole().then(role => {
          ngxPermissionsService.addPermission(role);
        },
        () => {
          ngxPermissionsService.addPermission('GUEST');
        },
      );
    },
    deps: [LoginService, NgxPermissionsService, HttpClient],
    multi: true,
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
