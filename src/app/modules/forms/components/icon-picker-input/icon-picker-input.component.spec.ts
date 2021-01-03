import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPickerInputComponent } from './icon-picker-input.component';

describe('IconPickerInputComponent', () => {
  let component: IconPickerInputComponent;
  let fixture: ComponentFixture<IconPickerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconPickerInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconPickerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
