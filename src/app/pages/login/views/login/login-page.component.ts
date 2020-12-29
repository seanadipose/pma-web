import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pma-login-page',
  template: `
    <div fxLayout="row" fxLayoutAlign="start start" fxFlexFill>
      <mat-card>
        <mat-card-header>
          <mat-card-title> Login </mat-card-title>
        </mat-card-header>
        <mat-card-content> </mat-card-content>
        <mat-card-actions>
          <button mat-button>Login</button>
          <button mat-button color="accent">Register</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
