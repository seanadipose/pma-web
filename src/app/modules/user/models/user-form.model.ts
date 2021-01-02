import firebase from 'firebase/app';
import { BaseForm } from '../../forms/models/base-form.model';
import { email, maxLength, minLength, prop, required, url } from '@rxweb/reactive-form-validators';
import { Injectable } from '@angular/core';

export interface UserForm extends firebase.UserInfo {}
@Injectable({ providedIn: 'any' })
export class UserForm extends BaseForm {
  @required()
  @email()
  email: string;

  @required()
  displayName: string;

  @prop()
  phoneNumber: string;

  @url()
  photoURL: string;

  @prop()
  providerId: string;
}

export class User extends UserForm {
  email: string;
  displayName: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
}
