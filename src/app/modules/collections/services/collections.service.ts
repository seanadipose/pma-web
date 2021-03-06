import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CollectionsType } from '../types/collections.type';

import firebase from 'firebase/app';
// import { FirestoreFileTypes } from '../types/firestore-file.types';

@Injectable({
  providedIn: 'root',
})
export abstract class CollectionService<T> {
  rootSegment = 'users';
  childSegments = {
    journals: 'journals',
    profile: 'profile',
  };

  collection: string;

  getCollection(): Observable<T[]> {
    const collection = this.db.collection(this.collection);

    return collection.snapshotChanges().pipe(
      map((arr: DocumentChangeAction<T>[]) =>
        arr.map((snap: any) => {
          const val = snap.payload.doc.data();
          let data = {};
          data = { ...val, id: snap.payload.doc.id } as T;
          return data as T;
        })
      )
    );
  }

  protected insertDoc(document: T) {
    const collection = this.db.collection<T>(this.collection);
    // const promises = document.map((itm) => collection.add(itm));
    // return Promise.all(promises);
    return collection.add(document);
  }

  private updateDoc(id: string) {
    console.log('not init');
    // console.log(id);

    return this.getDoc(id).update;
  }

  deleteDoc(id: string) {
    this.getDoc(id).delete();
  }

  protected getDoc(id: string) {
    return this.db.collection<T>(this.collection).doc(id);
  }

  getValueChanges() {
    return this.db.collection(this.collection).valueChanges();
  }
  constructor(public db: AngularFirestore) {}
}
