import { Component, Host, OnInit, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { dateBuilder } from 'src/app/core/functions/dates.function';
import { PmaInputComponent } from '../pma-input/pma-input.component';

const dates = dateBuilder();

@Component({
  selector: 'pma-date-input',
  template: `
    <mat-form-field [formGroup]="form.control" [appearance]="appearance">
      <mat-label> {{ label }} </mat-label>
      <input matInput #inputField="matInput" [formControlName]="name" [max]="maxDate" [matDatepicker]="picker" />
      <mat-error>{{ form.control.get(name)['errorMessage'] }}</mat-error>
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  `,
  styleUrls: ['./date-input.component.scss'],
  providers: [MatNativeDateModule],
})
export class DateInputComponent extends PmaInputComponent implements OnInit {
  maxDate = new Date();
  constructor(@Optional() @Host() public form: ControlContainer) {
    super(form);
  }

  ngOnInit(): void {
    console.log(this.maxDate);
    this.form.valueChanges.subscribe((obs) => console.log(this.form.control.get(this.name)));
  }
}
