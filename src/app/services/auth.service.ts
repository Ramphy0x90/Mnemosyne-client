import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthLogin } from '../models/auth/auth-login';
import { AuthSignUp } from '../models/auth/auth-sign-up';
import { AuthResponse } from '../models/auth/auth-response';
import { AuthState } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Broadcast auth user status to subscribers
   */
  userAuthStatus: EventEmitter<AuthState> = new EventEmitter();

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

  /**
   * This function is used to store the user token
   * and broadcast the authentication state
   * @param AuthResponse
   */
  storeUserToken(AuthResponse: AuthResponse): void {
    window.sessionStorage.clear();

    this.userAuthStatus.emit(AuthState.AUTHENTICATED);

    window.sessionStorage.setItem('token', AuthResponse.token);
    // window.sessionStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Get user authentication status
   * @returns AuthState
   */
  getUserAuthStatus(): AuthState {
    if (window.sessionStorage.getItem('token') !== null) {
      return AuthState.AUTHENTICATED;
    }

    return AuthState.UNAUTHENTICATED;
  }
}
