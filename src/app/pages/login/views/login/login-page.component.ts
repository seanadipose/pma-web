import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pma-login-page',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <mat-card>
        <mat-card-header>
          <mat-card-title> Login </mat-card-title>
        </mat-card-header>
        <mat-card-content></mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
