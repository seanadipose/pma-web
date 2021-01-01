import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmaTextboxInputComponent } from './pma-textbox-input.component';

describe('PmaTextboxInputComponent', () => {
  let component: PmaTextboxInputComponent;
  let fixture: ComponentFixture<PmaTextboxInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmaTextboxInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmaTextboxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
