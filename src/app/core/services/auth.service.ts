import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, from, of } from 'rxjs';
import firebase from 'firebase/app';
import { filter, map, share, switchMap, tap } from 'rxjs/operators';
import { UserForm } from 'src/app/modules/user/models/user-form.model';

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

  async updateUser(details: UserForm) {
    const { displayName, phoneNumber, photoURL } = details;
    const userObs = await this.currentUser.toPromise();
    console.log('🚀 ----------------------------------------------------------------------------------');
    console.log('🚀 ~ file: auth.service.ts ~ line 28 ~ AuthService ~ updateUser ~ userObs', userObs);
    console.log('🚀 ----------------------------------------------------------------------------------');

    userObs;
    // this.afAuth.updateCurrentUser({ ...userObs, providerData: [details] });
    // const newUser = {...user, ...details}
    // this.afAuth.;
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

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged((loginResult) => {
      console.log('auth state changed', loginResult);
      const { providerData = null } = loginResult;
      this.userSub.next(providerData[0]);
    });
  }
}
