import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { humanizePipe } from 'src/app/core/functions/humanize.function';

@Component({
  selector: 'pma-input',
  template: `
    <mat-form-field [formGroup]="form.control" [appearance]="appearance" fxFlexFill>
      <mat-label> {{ label }} </mat-label>
      <input matInput #inputField="matInput" [formControlName]="name" [type]="type" />
      <mat-error>{{ form.control.get(name)['errorMessage'] }}</mat-error>
    </mat-form-field>
  `,
  styleUrls: ['./pma-input.component.scss'],
  exportAs: 'pmaInput',
})
export class PmaInputComponent implements OnInit {
  @Input() type: 'time' | 'text' = 'text';

  @Input() name: string;
  label: string;
  @Input('label') set _label(label: string) {
    this.label = humanizePipe(label);
  }

  get value() {
    return this.form.control.get(this.name).value;
  }

  @Input() appearance: MatFormFieldAppearance = 'outline';
  ctrl: AbstractControl;
  constructor(@Optional() @Host() public form: ControlContainer) {}
  ngOnInit() {}
}
