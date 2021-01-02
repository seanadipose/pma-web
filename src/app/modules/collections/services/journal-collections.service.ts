import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { emotionCloud } from 'src/app/core/constants/emotion-cloud.constant';
import { Journal } from 'src/app/core/models/journal.model';
import { JournalForm } from 'src/app/pages/journal/models/journal-form.model';
import { COLLECTIONS } from '../types/collections.type';
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
  collection = COLLECTIONS[0];
  constructor(db: AngularFirestore) {
    super(db);
  }

  create(doc: Journal) {
    return this.insertDoc([doc]);
  }

  list() {
    return this.getCollection();
  }
}
