import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginForm } from './models/login-form.model';
import { UserForm } from './models/user-form.model';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: LoginForm, useValue: new LoginForm() },
    { provide: UserForm, useValue: new UserForm() },
  ],
})
export class UserModule {}
