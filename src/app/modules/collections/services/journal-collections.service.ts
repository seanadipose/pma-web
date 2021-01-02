import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { emotionCloud } from 'src/app/core/constants/emotion-cloud.constant';
import { Journal } from 'src/app/core/models/journal.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { JournalForm } from 'src/app/pages/journal/models/journal-form.model';
import { COLLECTIONS } from '../types/collections.type';
import { CollectionService } from './collections.service';
import { UserCollection, UserCollectionService } from './user-collections.service';

const stubPlaces = ['living room', 'kitchen', 'bedroom', 'mall', 'grocery store'];

const emotions = emotionCloud;

@Injectable({
  providedIn: 'root',
})
export class JournalCollectionService extends CollectionService<Journal> {
  private _userId: string;
  getPlaces() {
    return of(stubPlaces);
  }

  getEmtions() {
    return of(emotions);
  }

  // collection = COLLECTIONS[0];

  constructor(db: AngularFirestore) {
    super(db);
  }
  //
  init() {
    // this.userId.subscribe((id) => {
    // this._userId = id;
    // });
  }
  //
  create(userId: string, doc: Journal) {
    console.log(
      '🚀 --------------------------------------------------------------------------------------------------'
    );
    console.log('🚀 ~ file: journal-collections.service.ts ~ line 43 ~ JournalCollectionService ~ create ~ doc', doc);
    console.log(
      '🚀 --------------------------------------------------------------------------------------------------'
    );
    // const id = this._userId ? this._userId : null;
    console.log(userId);
    return this.db.collection(`users/${userId}/journals`).add(doc);
  }

  list() {
    // return this.getCollection();
  }

  getOne(id: string) {
    return this.getDoc(id).get();
  }
}
