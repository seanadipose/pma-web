import { Component, OnInit } from '@angular/core';
import { IFormGroup, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { map, take } from 'rxjs/operators';
import { LogLevels } from 'src/app/core/enums/enums/log-levels.enum';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { PmaFormsService } from 'src/app/modules/forms/services/pma-forms.service';
import { UserForm } from 'src/app/modules/user/models/user-form.model';

@Component({
  selector: 'pma-dashboard',
  template: `
    <mat-card class="main-banner">
      <img mat-card-image src="assets/home-banner.jpg" alt="Photo of a Shiba Inu" class="hl-image" />
    </mat-card>
    <pma-user-form *ngIf="user$ | async as user" [fg]="userFg" [user]="user" (saveUserForm)="updateUser($event)">
      <error-state>{{ errorState }}</error-state>
    </pma-user-form>
  `,
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  userFg: IFormGroup<UserForm>;
  errorState: any;
  user$: any;

  constructor(
    public userForm: UserForm,
    public formSvc: PmaFormsService,
    public authSvc: AuthService,
    private errorSvc: ErrorService
  ) {
    this.userFg = this.formSvc.makeForm(this.userForm);
  }

  ngOnInit(): void {
    // const builder = this.formSvc.makeForm(this.userForm);
    // this.userForm = builder(this.authSvc.user);
    this.user$ = this.authSvc.checkUser().pipe(map((user) => user));
  }

  async updateUser(user: UserForm) {
    try {
      const res = await this.authSvc.updateUser(user);
      this.errorSvc.log(LogLevels.DEBUG, { message: 'Changes saved sucessfully' });
    } catch (err) {
      const errorRef = this.errorSvc.log(LogLevels.WARN, { message: err.message });
      errorRef.pipe(take(1)).subscribe((res) => (this.errorState = null));

      this.errorState = err.message;
    }
  }
}
