import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthLogin } from '../models/auth/auth-login';
import { AuthSignUp } from '../models/auth/auth-sign-up';
import { AuthResponse } from '../models/auth/auth-response';
import { AuthState } from '../constants';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  constructor(
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {
    this.recoverAuthStatus();
  }

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
    const token = window.sessionStorage.getItem('token');

    if (token !== null && !this.jwtHelperService.isTokenExpired(token)) {
      return AuthState.AUTHENTICATED;
    } else if (this.jwtHelperService.isTokenExpired(token)) {
      return AuthState.SESSION_EXPIRED;
    }

    return AuthState.UNAUTHENTICATED;
  }

  /**
   * Recover user auth status
   */
  recoverAuthStatus(): void {
    this.userAuthStatus.emit(this.getUserAuthStatus());
  }

  /**
   * Log out user
   */
  logOut(): void {
    this.userAuthStatus.emit(AuthState.LOGGED_OUT);
    window.sessionStorage.clear();
  }
}
