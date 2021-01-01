import { TestBed } from '@angular/core/testing';

import { JournalCollectionsService } from './journal-collections.service';

describe('JournalCollectionsService', () => {
  let service: JournalCollectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalCollectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
