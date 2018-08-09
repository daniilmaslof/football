import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../../core/services/login.service';

/**
 * Component with login form.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /**
   * Form  with two field email and password.
   */
  public loginForm: FormGroup;
  /**
   * Field login form with validators email and required.
   */
  public email = new FormControl('', [Validators.required, Validators.email]);

  /**
   * Field login form with required.
   */
  public password = new FormControl('', [Validators.required]);

  /**
   * Error received when sending to http.
   */
  public error: string;

  /**
   * @param router Router angular.
   * @param loginService Service for authorization.
   */
  constructor(private router: Router, private loginService: LoginService) {
  }

  /**
   * Create Form login.
   */
  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': this.email,
      'password': this.password,
    });
  }

  /**
   * Create error message when email is wrong.
   */
  public getErrorMessageEmail(): string {
    return this.email.hasError('required') ? 'Email is required' :
      this.email.hasError('email') ? 'Incorrect email' : '';
  }

  /**
   * Create error message when password is wrong.
   */
  public getErrorMessagePassword(): string {
    return this.password.hasError('required') ? 'Password is required' : '';
  }

  /**
   * Redirect if user entered correct email,and password or create error if authorization error occurred.
   */
  public login(): void {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      () => this.router.navigate(['table']),
      httpErrorResponse => this.error = `${httpErrorResponse.error} status server ${httpErrorResponse.status}`,
    );
  }
}
