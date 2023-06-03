import { Component, OnInit } from '@angular/core';
import { AuthLogin } from 'src/app/models/auth/auth-login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    let test: AuthLogin = {
      username: 'user_test',
      password: 'password',
    };

    this.authService.logIn(test).subscribe({
      next: (data) => {
        console.log('CHECK');
        console.log(data);
      },
    });
  }
}
