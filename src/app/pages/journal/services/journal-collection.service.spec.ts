import { TestBed } from '@angular/core/testing';

import { JournalCollectionService } from './journal-collection.service';

describe('JournalCollectionService', () => {
  let service: JournalCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
