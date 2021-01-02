import { TestBed } from '@angular/core/testing';

import { JournalCollectionService } from './journal-collections.service';

describe('JournalCollectionsService', () => {
  let service: JournalCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
