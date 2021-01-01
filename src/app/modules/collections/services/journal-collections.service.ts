import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Journal } from 'src/app/core/models/journal.model';
import { JournalForm } from 'src/app/pages/journal/models/journal-form.model';
import { COLLECTIONS } from '../types/collections.type';
import { CollectionService } from './collections.service';

@Injectable({
  providedIn: 'root',
})
export class JournalCollectionsService extends CollectionService<Journal> {
  collection = COLLECTIONS[0];
  constructor(db: AngularFirestore) {
    super(db);
  }

  create(doc: JournalForm) {
    return this.insertDoc([doc]);
  }
}
