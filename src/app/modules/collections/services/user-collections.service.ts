import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Journal } from 'src/app/core/models/journal.model';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { User, UserForm } from '../../user/models/user-form.model';
import { COLLECTIONS } from '../types/collections.type';

import { CollectionService } from './collections.service';

const userSegment = 'users';
export interface UserCollection extends UserForm {
  id?: string;
  // providerId: string;
  journals?: Journal[];
  created: Date;
}

@Injectable({
  providedIn: 'root',
})
export class UserCollectionService extends CollectionService<UserCollection> {
  collection = COLLECTIONS[1];
  collectionRef: CollectionReference<UserCollection>;
  email: string;

  // collectionRef

  constructor(public db: AngularFirestore, private authService: AuthService) {
    super(db);
    this.collectionRef = this.db.collection<UserCollection>(`${userSegment}`).ref;
  }

  init(user: User) {
    console.log(user);
    this.email = user.email;
    from(this.userQuery(user.email)).subscribe((obs) => {
      const docs = obs.docs;
      if (docs.length < 1) {
        console.log('added user');
        this.addUser(user);
      }
    });
  }
  insertUserDoc(user: UserForm, providerId: string) {
    const doc = this.db.collectionGroup;

    return doc;
    // return collection;
  }

  private async addUser(user: UserForm) {
    return this.collectionRef.doc().set({ id: this.db.createId(), ...user, created: new Date() }, { merge: true });
  }

  addJournalCollection() {
    // this.collectionRef.add({journals: []})
  }

  userQuery(email: string) {
    return this.collectionRef.where('email', '==', email).limit(1).get();
  }

  userId(email: string) {
    return from(this.userQuery(email)).pipe(map((result) => (result.docs.length > 0 ? result.docs[0].id : null)));
  }
}
