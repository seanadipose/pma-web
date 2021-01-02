import { Injectable } from '@angular/core';
import { CollectionReference } from '@angular/fire/firestore';
import { UserCollection, UserCollectionService } from 'src/app/modules/collections/services/user-collections.service';
import { User, UserForm } from 'src/app/modules/user/models/user-form.model';

@Injectable({ providedIn: 'root' })
export class StateService {
  user: UserCollection;
  userRef: CollectionReference<UserForm>;
  private _userId: any;
  _email: string;

  get email() {
    return this._email;
  }

  get userId() {
    return this._userId;
  }

  constructor(private userSvc: UserCollectionService) {}

  async init(user: User) {
    if (!user.uid) throw new Error('no user Id');
    this._userId = await this.userSvc.userId(user.email).toPromise();
    this._email = user.email;

    // const res = await this.userRef.doc(user.uid);
  }
}
