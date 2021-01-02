import { Inject, Injectable, SkipSelf } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, from, of } from 'rxjs';
import firebase from 'firebase/app';
import { filter, map, share, switchMap, take, tap } from 'rxjs/operators';
import { UserForm } from 'src/app/modules/user/models/user-form.model';
import { Optional } from '@angular/core';

import * as R from 'remeda';
import { USER_FIELDS_TOKEN } from 'src/app/core/tokens/user-fields.token';
import { UserFieldsType } from '../constants/user-fields.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _setUser(authResult: firebase.User) {
    function mapUser(authResult: firebase.User) {
      const user = R.pick(authResult, this.fields);

      return user;
    }

    this._user = authResult;
    return mapUser(authResult);
  }

  private _user: firebase.User;
  get user() {
    return this.userSub.value;
  }

  private userSub = new BehaviorSubject<firebase.UserInfo>(null);

  get user$() {
    return this.userSub.asObservable().pipe(share());
  }
  get isAuth() {
    return !!this._user;
  }

  async updateUser(details: UserForm) {
    const { displayName, phoneNumber, photoURL } = details;
    const userObs = await this.currentUser.toPromise();

    new Promise((resolve, reject) =>
      userObs
        .updateProfile({ displayName, photoURL })
        .then(function () {
          resolve('update finished');
        })
        .catch((err) => reject(err))
    );
  }

  get currentUser() {
    return from(this.afAuth.currentUser);
  }

  login(user: string, pw: string) {
    return from(this.afAuth.signInWithEmailAndPassword(user, pw));
  }

  logout() {
    this._user = null;
    return from(this.afAuth.signOut());
  }

  checkUser() {
    return this.afAuth.user;
  }

  constructor(
    @Inject(USER_FIELDS_TOKEN) private fields: UserFieldsType,
    @Optional() @SkipSelf() authSvc: AuthService,
    private afAuth: AngularFireAuth
  ) {
    if (authSvc) {
      console.log('auth service started twice');
      return authSvc;
      throw new Error('auth service imported twice');
    }
    console.log('auth service started');
    this.checkUser()
      .pipe(take(1))
      .subscribe((res) => (this._user = res));
  }
}
