import { Component, Input, OnInit } from '@angular/core';
import { IFormGroup } from '@rxweb/reactive-form-validators';
import { Journal } from 'src/app/core/models/journal.model';
import { JournalForm } from '../../models/journal-form.model';

@Component({
  selector: 'pma-journal-form',
  template: `
    <form #userForm="ngForm" [formGroup]="fg" fxLayout="column">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isNew ? 'Create Journal' : 'Update Journal' }}</mat-card-title>
          <mat-card-subtitle></mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <mat-list>
            <pma-date-input mat-list-item name="dateTime" label="dateTime"></pma-date-input>
            <pma-input mat-list-item name="geoloc" label="geoloc"></pma-input>
            <pma-input mat-list-item name="place" label="location"></pma-input>
            <pma-input mat-list-item name="title" label="title"></pma-input>

            <pma-input mat-list-item name="description" label="description"></pma-input>
          </mat-list>
        </mat-card-content>
      </mat-card>
    </form>
  `,
  styleUrls: ['./journal-form.component.scss'],
})
export class JournalFormComponent implements OnInit {
  @Input() isNew = false;
  @Input() fg: IFormGroup<JournalForm>;

  @Input('journal') set journal(jrnl: Journal) {
    console.log(jrnl);
    this.fg.patchModelValue(jrnl);
  }

  constructor() {}

  ngOnInit(): void {
    console.log(this);
  }
}
