import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, from } from 'rxjs';
import firebase from 'firebase/app';
import { filter, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: firebase.UserInfo;
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

  currentUser() {
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

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged((loginResult) => {
      console.log('auth state changed', loginResult);
      const { providerData = null } = loginResult;
      this.userSub.next(providerData[0]);
    });
  }
}
