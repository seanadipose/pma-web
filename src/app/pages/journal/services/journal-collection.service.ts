import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { emotionCloud } from 'src/app/core/constants/emotion-cloud.constant';

const stubPlaces = ['living room', 'kitchen', 'bedroom', 'mall', 'grocery store'];

const emotions = emotionCloud;

@Injectable({
  providedIn: 'root',
})
export class JournalCollectionService {
  getPlaces() {
    return of(stubPlaces);
  }

  getEmtions() {
    return of(emotions);
  }

  constructor() {}
}
