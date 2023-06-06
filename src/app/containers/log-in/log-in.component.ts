import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLogin } from 'src/app/models/auth/auth-login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  authForm: AuthLogin = { username: null, password: null };
  invalidCredentials: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService.logIn(this.authForm).subscribe({
      next: (data) => {
        this.invalidCredentials = false;
        console.log('CHECK');
        console.log(data);
      },
      error: (err) => {
        this.invalidCredentials = true;
      },
    });
  }
}
