import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthState } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.getUserAuthStatus() == AuthState.UNAUTHENTICATED) {
      this.router.navigate(['log-in']);
      return false;
    }

    return true;
  }
}
