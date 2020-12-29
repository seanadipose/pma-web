import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginForm } from './models/login-form.model';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: LoginForm, useValue: new LoginForm() }],
})
export class UserModule {}
