import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { LoginForm } from 'src/app/modules/user/models/login-form.model';

@Component({
  selector: 'pma-login-page',
  template: `
    <div fxLayout="row" fxLayoutAlign="start start" fxFlexFill>
      <mat-card>
        <mat-card-header>
          <mat-card-title> Login to PMA</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="fg" fxLayout="column">
            <mat-form-field appearance="outline">
              <mat-label> Email </mat-label>
              <input matInput formControlName="username" />
              <mat-error></mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Password </mat-label>
              <input matInput formControlName="password" type="password" />
            </mat-form-field>
            <mat-error></mat-error>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button [disabled]="fg.invalid">Login</button>
          <button mat-button color="accent">Register</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  fg: FormGroup;
  constructor(fb: RxFormBuilder, loginForm: LoginForm) {
    this.fg = fb.formGroup(loginForm);
  }

  ngOnInit(): void {}
}
