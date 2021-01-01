import { Injectable } from '@angular/core';
import { email, maxLength, minLength, required } from '@rxweb/reactive-form-validators';
import { BaseForm } from '../../forms/models/base-form.model';

@Injectable({ providedIn: 'any' })
export class LoginForm extends BaseForm {
  @required(BaseForm.requiredErrorMessage('username'))
  @email()
  username: string;

  @required(BaseForm.requiredErrorMessage('pasword'))
  @minLength({ value: 5, message: 'Password must be at least 5 characters' })
  @maxLength({ value: 10, message: 'Password must be at least 10 characters' })
  password: string;
}
