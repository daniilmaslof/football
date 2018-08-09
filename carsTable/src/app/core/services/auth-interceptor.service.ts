import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * Interceptor http request.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {

  /**
   * Interceptor http request and insert http header authorization if there is a token.
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer' + token),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
