import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthLogin } from '../models/auth/auth-login';
import { AuthSignUp } from '../models/auth/auth-sign-up';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  /**
   * This function is used to autenticate an user
   * @param user crednetials
   * @returns
   */
  logIn(user: AuthLogin): Observable<any> {
    return this.httpClient.post(
      `${environment.server}/auth/login`,
      user,
      this.httpOptions
    );
  }

  /**
   * This function is used to register a new user
   * @param user crednetials
   * @returns
   */
  register(user: AuthSignUp): Observable<any> {
    return this.httpClient.post(
      `${environment.server}/auth/register`,
      user,
      this.httpOptions
    );
  }
}
