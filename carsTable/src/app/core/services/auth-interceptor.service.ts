import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError, switchMap } from 'rxjs/operators';

import { LoginComponent } from '../../client/components/login/login.component';

import { LoginService } from './login.service';

/**
 * Interceptor http request.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {

  public constructor(private router: Router, private matDialog: MatDialog, private loginService: LoginService) {

  }

  /**
   * Interceptor http request and insert http header authorization if there is a token.
   * Cath http error response and if error status 401 call the dialog and if the user logs in again request.
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloned = req.clone();
    const token = localStorage.getItem('token');
    if (token) {
      cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer' + token),
      });
    }
    return next.handle(cloned).pipe(
      catchError(err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.loginService.saveFailedRequest(cloned);
              const loginDialog = this.matDialog.open(LoginComponent, {
                width: '400px',
                height: '350px',
              } as MatDialogConfig<any>);
              return loginDialog.afterClosed().pipe(
                switchMap(
                  loggedOn => {
                    if (loggedOn) {
                      return this.loginService.retryFailedRequest();
                    }
                    return Observable.throwError(err);
                  }));
            }
            return next.handle(cloned);
          }
        },
      ));
  }
}
