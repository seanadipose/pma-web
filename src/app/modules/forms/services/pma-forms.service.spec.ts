import { TestBed } from '@angular/core/testing';

import { PmaFormsService } from './pma-forms.service';

describe('PmaFormsService', () => {
  let service: PmaFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PmaFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
