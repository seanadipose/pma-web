import { Injectable } from '@angular/core';
import { required } from '@rxweb/reactive-form-validators';

@Injectable({ providedIn: 'any' })
export class LoginForm {
  @required()
  username: string;

  @required()
  password: string;
}
