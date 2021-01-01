import { Injectable } from '@angular/core';
import { of } from 'rxjs';

const stubPlaces = ['living room', 'kitchen', 'bedroom', 'mall', 'grocery store'];

@Injectable({
  providedIn: 'root',
})
export class JournalCollectionService {
  getPlaces() {
    return of(stubPlaces);
  }

  constructor() {}
}
