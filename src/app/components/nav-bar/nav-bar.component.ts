import { Component, OnInit } from '@angular/core';
import { NavComponent } from 'src/app/models/navigation/nav-component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  navOptions: NavComponent[] = [
    {
      name: 'Login',
      route: 'log-in',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
