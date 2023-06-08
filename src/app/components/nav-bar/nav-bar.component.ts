import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState } from 'src/app/constants';
import { NavComponent } from 'src/app/models/navigation/nav-component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  userLogged: boolean = false;

  navOptions: { [key in string]: NavComponent[] } = {
    unauthenticated: [
      {
        name: 'Login',
        route: 'log-in',
      },
      {
        name: 'Signup',
        route: 'sign-up',
      },
    ],
    authenticated: [
      {
        name: 'Log out',
        route: '',
      },
    ],
  };

  constructor(private authService: AuthService, private router: Router) {
    this.authService.userAuthStatus.subscribe({
      next: (userAuthStatus: AuthState) => {
        this.userLogged = userAuthStatus == AuthState.AUTHENTICATED;
      },
    });
  }

  ngOnInit(): void {}

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['log-in']);
  }
}
