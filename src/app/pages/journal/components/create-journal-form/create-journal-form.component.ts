import { Component, OnInit } from '@angular/core';
import { JournalForm } from '../../models/journal-form.model';
import { JournalFormComponent } from '../journal-form/journal-form.component';

@Component({
  selector: 'pma-create-journal-form',
  template: `
    <mat-horizontal-stepper #stepper>
      <form [formGroup]="fg">
        <mat-step>
          <ng-template matStepLabel>When and where</ng-template>
          <div fxLayout="column" fxLayoutAlign="start" fxLayoutGap="10px" class="step-container">
            <pma-date-input name="dateTime" label="dateTime" fxFlexFill></pma-date-input>
            <pma-input name="geoloc" label="geoloc" fxFlexFill></pma-input>
            <pma-input name="location" label="location" fxFlexFill></pma-input>
          </div>
        </mat-step>
        <mat-step>
          <ng-template matStepLabel>What happened</ng-template>
          <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="15ppx" class="step-container">
            <pma-input name="title" label="title" fxFlexFill></pma-input>

            <pma-textbox-input name="description" label="description" fxFlexFill></pma-textbox-input>
          </div>
        </mat-step>
        <mat-step>
          <ng-template matStepLabel>How you feel</ng-template>
        </mat-step>
      </form>
    </mat-horizontal-stepper>
  `,
  styleUrls: ['./create-journal-form.component.scss'],
})
export class CreateJournalFormComponent extends JournalFormComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.fg.valueChanges.subscribe((obs) => console.log(this.fg.controls));
  }
}
