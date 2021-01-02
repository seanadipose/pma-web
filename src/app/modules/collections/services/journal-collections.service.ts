import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { emotionCloud } from 'src/app/core/constants/emotion-cloud.constant';
import { Journal } from 'src/app/core/models/journal.model';
import { CollectionService } from './collections.service';

const stubPlaces = ['living room', 'kitchen', 'bedroom', 'mall', 'grocery store'];

const emotions = emotionCloud;

@Injectable({
  providedIn: 'root',
})
export class JournalCollectionService extends CollectionService<Journal> {
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

  list(userId: string) {
    const ref = this.db.collection<Journal>('users').doc(userId).ref.collection('journals');

    return ref.get();
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
    return this.db.collection<Journal>(`users/${userId}/journals`).add(doc);
  }

  getOne(userId: string, docId) {
    this.db
      .collection('users')
      .snapshotChanges()
      .subscribe((docs) => console.log(docs));
    return this.db.collection<Journal>(`users`).get();
  }
}
