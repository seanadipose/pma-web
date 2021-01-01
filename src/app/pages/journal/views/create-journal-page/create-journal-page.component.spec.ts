import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJournalPageComponent } from './create-journal-page.component';

describe('CreateJournalPageComponent', () => {
  let component: CreateJournalPageComponent;
  let fixture: ComponentFixture<CreateJournalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJournalPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJournalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
