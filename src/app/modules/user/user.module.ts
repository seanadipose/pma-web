import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginForm } from './models/login-form.model';
import { UserForm } from './models/user-form.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';
import { USER_FIELDS_TOKEN } from 'src/app/core/tokens/user-fields.token';

import * as R from 'remeda';
import { USER_FIELDS } from './constants/user-fields.constant';

const userFields = R.concat(USER_FIELDS);

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: LoginForm, useValue: new LoginForm() },
    { provide: UserForm, useValue: new UserForm() },
    { provide: AngularFireAuth, useExisting: AngularFireAuth },
    { provide: USER_FIELDS_TOKEN, useValue: userFields },
    AuthService,
  ],
})
export class UserModule {}
