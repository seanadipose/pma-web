import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmaInputComponent } from './pma-input.component';

describe('PmaInputComponent', () => {
  let component: PmaInputComponent;
  let fixture: ComponentFixture<PmaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmaInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
