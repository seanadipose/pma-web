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
      <input type="text" matInput [formControlName]="name" [matAutocomplete]="auto" [required]="required" />
      <mat-icon matSuffix>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g data-name="Layer 2">
            <g data-name="search">
              <rect width="24" height="24" opacity="0" />
              <path
                d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"
              />
            </g>
          </g>
        </svg>
      </mat-icon>

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
  @Input() required = true;
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
