import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { PmaInputComponent } from '../pma-input/pma-input.component';

@Component({
  selector: 'pma-select-input',
  template: `
    <mat-form-field [formGroup]="form.control" [appearance]="appearance" fxFlexFill>
      <mat-label> {{ label }} </mat-label>
      <mat-select [formControl]="form.control.get(name)" type="text">
        <mat-option *ngFor="let option of options" [value]="option">{{ option }}</mat-option>
      </mat-select>
      <mat-error>{{ form.control.get(name)['errorMessage'] }}</mat-error>
    </mat-form-field>
  `,
  styleUrls: ['./select-input.component.scss'],
})
export class SelectInputComponent extends PmaInputComponent implements OnInit {
  @Input() options: string[];
  constructor(@Optional() @Host() public form: ControlContainer) {
    super(form);
  }

  ngOnInit(): void {}
}
