import { Host, Optional } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { PmaInputComponent } from '../pma-input/pma-input.component';

@Component({
  selector: 'pma-password-input',
  template: `
    <mat-form-field [formGroup]="form.control" [appearance]="appearance" fxFlexFill>
      <mat-label> {{ label }} </mat-label>
      <input matInput #inputField="matInput" [formControlName]="name" type="password" />
      <mat-error>{{ form.control.get(name)['errorMessage'] }}</mat-error>
    </mat-form-field>
  `,
  styleUrls: ['./password-input.component.scss'],
  exportAs: 'pmaPassword',
})
export class PasswordInputComponent extends PmaInputComponent implements OnInit {
  constructor(@Optional() @Host() public form: ControlContainer) {
    super(form);
  }

  ngOnInit(): void {}
}
