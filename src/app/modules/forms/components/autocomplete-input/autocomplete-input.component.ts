import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { PmaInputComponent } from '../pma-input/pma-input.component';

import * as R from 'remeda';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'pma-autocomplete-input',
  template: `
    <!-- <ng-container *ngIf="filteredOptions | async as opts"> -->
    <mat-form-field [formGroup]="form.control" [appearance]="appearance" fxFlexFill>
      <mat-label>{{ label }}</mat-label>
      <input type="text" matInput [formControlName]="name" [matAutocomplete]="auto" />
      <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete" (optionSelected)="addSelection($event)">
        <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
          {{ option }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
    <!-- </ng-container> -->
  `,
  styleUrls: ['./autocomplete-input.component.scss'],
  exportAs: 'autoInput',
})
export class AutocompleteInputComponent extends PmaInputComponent implements OnInit {
  selectedOptions: string[] = [];
  @Input() options: string[] = [];

  addSelection(opt: MatAutocompleteSelectedEvent) {
    this.selectedOptions = R.concat(this.selectedOptions, [opt.option.value]);
  }
  filteredOptions: Observable<string[]>;
  constructor(@Optional() @Host() public form: ControlContainer) {
    super(form);
  }

  ngOnInit(): void {
    console.log(this);
    const control = this.form.control.get(this.name).valueChanges;

    this.filteredOptions = control.pipe(
      debounceTime(100),
      map((val) => this._filter(val))
    );

    console.log(this.form);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    const filtered = R.filter(this.options, (word) => {
      const test = word.toLowerCase().includes(filterValue);
      return test;
    });

    return filtered;
    // return this.options;
  }

  removeSelection(index: number) {
    this.selectedOptions = R.pipe(
      R.splitAt(this.selectedOptions, index),
      (arr) => [arr[0], R.drop(arr[1], 1)],
      R.flatten()
    );
  }
}
