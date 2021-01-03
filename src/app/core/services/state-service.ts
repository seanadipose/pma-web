import { Injectable, SkipSelf } from '@angular/core';
import { CollectionReference } from '@angular/fire/firestore';
import { UserCollection, UserCollectionService } from 'src/app/modules/collections/services/user-collections.service';
import { User, UserForm } from 'src/app/modules/user/models/user-form.model';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import firebase from 'firebase/app';
import { filter, share, switchMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StateService {
  #user: UserCollection;
  #userRef: CollectionReference<UserForm>;
  // private _userId: any;
  #email: string;

  private userIdSub = new BehaviorSubject<string>(null);

  userId$() {
    return this.userIdSub.asObservable().pipe(
      share(),
      filter((id) => !!id)
    );
  }

  setUserId(id: string) {
    this.userIdSub.next(id);
  }

  private setUser(user: Partial<firebase.UserInfo> = { email: null }) {
    const { email = null } = user;

    return email;
  }

  constructor(private authSvc: AuthService, private userSvc: UserCollectionService) {
    // subscribe((result) => (this.#email = result ? this.setUser(result) : null));
  }

  init(user: User) {
    console.log('🚀 ------------------------------------------------------------------------');
    console.log('🚀 ~ file: state-service.ts ~ line 38 ~ StateService ~ init ~ user', user);
    console.log('🚀 ------------------------------------------------------------------------');
    // this.authSvc.user$
    //   .pipe(
    //     filter((user) => !!user),
    //     switchMap((email) => this.userSvc.userId(this.setUser(email)))
    //   )
    //   .subscribe((user) => (user ? this.userIdSub.next(user) : null));

    return this.userSvc.userId(this.setUser(user));
  }
}
