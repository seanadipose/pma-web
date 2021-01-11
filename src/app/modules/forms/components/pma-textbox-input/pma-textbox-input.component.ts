import { Component, Host, OnInit, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { PmaInputComponent } from '../pma-input/pma-input.component';

@Component({
  selector: 'pma-textbox-input',
  template: `
    <mat-form-field [formGroup]="form.control" [appearance]="appearance" fxFlexFill>
      <mat-label> {{ label }} </mat-label>
      <textarea
        matInput
        #inputField="matInput"
        [formControlName]="name"
        type="text"
        [placeholder]="placeholder"
      ></textarea>
      <mat-error>{{ form.control.get(name)['errorMessage'] }}</mat-error>
    </mat-form-field>
  `,
  styleUrls: ['./pma-textbox-input.component.scss'],
  exportAs: 'pmaTextbox',
})
export class PmaTextboxInputComponent extends PmaInputComponent implements OnInit {
  constructor(@Optional() @Host() public form: ControlContainer) {
    super(form);
  }

  ngOnInit(): void {}
}
