import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

/**
 * Service communication with http server https://backend-jscamp.saritasa-hosting.com/api/auth.
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {

  /**
   * @param httpClient standard angular http communication class.
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Send password and email and if they are correct save token in Local Storage.
   *
   * @param email entered by the user.
   * @param password entered by the user.
   */
  public login(email: string, password: string): Observable<any> {
    return this.httpClient.post('https://backend-jscamp.saritasa-hosting.com/api/auth', { email, password }).pipe(
      tap(response => localStorage.setItem('token', response['token'])),
    );
  }
}
