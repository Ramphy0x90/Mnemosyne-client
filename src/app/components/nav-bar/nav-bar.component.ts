import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState, NavOption, ShowNavOptionOn } from 'src/app/constants';
import { NavComponent } from 'src/app/models/navigation/nav-component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  userLogged: boolean = false;

  NavOption = NavOption;
  navOptions: { [key in ShowNavOptionOn]: NavComponent[] } = {
    [ShowNavOptionOn.USER_UNAUTHENTICATED]: [
      {
        id: NavOption.LOGIN,
        name: 'Login',
        route: 'log-in',
      },
      {
        id: NavOption.SIGNUP,
        name: 'Signup',
        route: 'sign-up',
      },
    ],
    [ShowNavOptionOn.USER_AUTHENTICATED]: [
      {
        id: NavOption.CLOUD,
        name: 'Cloud',
        route: 'cloud',
      },
      {
        id: NavOption.LOGOUT,
        name: 'Log out',
        route: null,
      },
    ],
    [ShowNavOptionOn.USER_ADMIN]: [],
    [ShowNavOptionOn.ALL]: [],
    [ShowNavOptionOn.TEST]: [],
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
