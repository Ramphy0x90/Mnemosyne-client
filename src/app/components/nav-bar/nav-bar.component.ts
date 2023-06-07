import { Component, OnInit } from '@angular/core';
import { AuthState, ShowNavOptionOn } from 'src/app/constants';
import { NavComponent } from 'src/app/models/navigation/nav-component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  userLogged: boolean = false;

  navOptions: NavComponent[] = [
    {
      name: 'Login',
      route: 'log-in',
      visible: ShowNavOptionOn.USER_UNAUTHENTICATED,
    },
    {
      name: 'Signup',
      route: 'sign-up',
      visible: ShowNavOptionOn.USER_UNAUTHENTICATED,
    },
  ];

  constructor(private authService: AuthService) {
    authService.userAuthStatus.subscribe({
      next: (userAuthStatus: AuthState) => {
        this.userLogged = userAuthStatus == AuthState.AUTHENTICATED;
      },
    });
  }

  ngOnInit(): void {}

  optionVisible(showOn: ShowNavOptionOn): boolean {
    switch (showOn) {
      case ShowNavOptionOn.USER_AUTHENTICATED:
        return this.userLogged;

      case ShowNavOptionOn.USER_UNAUTHENTICATED:
        return this.userLogged;

      case ShowNavOptionOn.USER_ADMIN:
        return false;

      default:
        return false;
    }
  }

  userAuthenticated(): boolean {
    return this.userLogged;
  }
}
