import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilderConfiguration, IFormGroup, RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { take } from 'rxjs/operators';
import { LogLevels } from 'src/app/core/enums/enums/log-levels.enum';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { PmaFormsService } from 'src/app/modules/forms/services/pma-forms.service';
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
          <form #loginForm="ngForm" [formGroup]="fg" fxLayout="column">
            <pma-input #user="pmaInput" appearance="outline" name="username" fxFlex="100" fxFlexFill label="username">
            </pma-input>
            <pma-password-input
              #pw="pmaPassword"
              appearance="outline"
              name="password"
              fxFlex="100"
              fxFlexFill
              label="password"
              (keyup.enter)="login(user.value, pw.value)"
            >
            </pma-password-input>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button [disabled]="fg.invalid" (click)="login(user.value, pw.value)">Login</button>
          <button mat-button color="accent">Register</button>
        </mat-card-actions>
        <mat-footer>
          <ng-container
            ><mat-error *ngIf="errorState">{{ errorState }}</mat-error></ng-container
          >
        </mat-footer>
      </mat-card>
    </div>
  `,
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  fg: IFormGroup<LoginForm>;
  errorState: string;
  constructor(
    fb: RxFormBuilder,
    loginForm: LoginForm,
    private authSvc: AuthService,
    private errorSvc: ErrorService,
    private router: Router,
    private formsSvc: PmaFormsService
  ) {
    this.fg = fb.formGroup(loginForm) as IFormGroup<LoginForm>;
  }

  ngOnInit(): void {
    this.authSvc.user$.subscribe((res) => {
      const isAuth = !!res;

      // if (isAuth) return this.router.navigate(['home']);
    });
  }

  async login(user: string, pw: string) {
    try {
      await this.authSvc.login(user, pw).toPromise();
    } catch (err) {
      const errorRef = this.errorSvc.log(LogLevels.WARN, { message: err.message });
      errorRef.pipe(take(1)).subscribe((res) => (this.errorState = null));
      this.fg.get('password').reset();

      this.errorState = err.message;
    }
  }
}
