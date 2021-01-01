import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJournalFormComponent } from './create-journal-form.component';

describe('CreateJournalFormComponent', () => {
  let component: CreateJournalFormComponent;
  let fixture: ComponentFixture<CreateJournalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJournalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJournalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
