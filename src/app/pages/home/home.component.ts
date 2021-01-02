import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/user/services/auth.service';

@Component({
  selector: 'pma-home',
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
