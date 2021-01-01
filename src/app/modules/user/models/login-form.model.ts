import { Injectable } from '@angular/core';
import { email, maxLength, minLength, password, required } from '@rxweb/reactive-form-validators';
import { BaseForm } from '../../forms/models/base-form.model';

@Injectable({ providedIn: 'any' })
export class LoginForm extends BaseForm {
  @required(BaseForm.requiredErrorMessage('username'))
  @email()
  username: string;

  @required(BaseForm.requiredErrorMessage('pasword'))
  @password({
    validation: { digit: true, alphabet: true },
  })
  @minLength({ value: BaseForm.minPwLength, message: 'Password must be at least 5 characters' })
  @maxLength({ value: BaseForm.maxPwLength, message: 'Password must be at least 10 characters' })
  password: string;
}
