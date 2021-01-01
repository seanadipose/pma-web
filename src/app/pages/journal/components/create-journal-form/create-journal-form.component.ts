import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JournalForm } from '../../models/journal-form.model';
import { JournalCollectionService } from '../../services/journal-collection.service';
import { JournalFormComponent } from '../journal-form/journal-form.component';

@Component({
  selector: 'pma-create-journal-form',
  template: `
    <mat-horizontal-stepper #stepper>
      <form [formGroup]="fg">
        <mat-step [hasError]="stepOneValid" errorMessage="must fill out all fields">
          <ng-template matStepLabel>When and where</ng-template>
          <div fxLayout="column" fxLayoutAlign="start" fxLayoutGap="10px" class="step-container">
            <div fxLayout="row" fxLayoutAlign="start start" fxLayoutGap="15px" fxFlexFill>
              <pma-date-input name="dateTime" label="When it started" fxFlex="50"></pma-date-input>
              <pma-input type="time" name="time" label="Time of day" fxFlex="50"></pma-input>
            </div>
            <pma-location-input name="geoloc" label="location" fxFlexFill></pma-location-input>
            <pma-select-input name="place" label="Place" fxFlexFill [options]="placeOptions | async"></pma-select-input>
          </div>
        </mat-step>
        <mat-step [hasError]="stepTwoValid">
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
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class CreateJournalFormComponent extends JournalFormComponent implements OnInit {
  get stepOneValid() {
    const { dateTime, time, place } = this.fg.controls;

    const check = [dateTime, time, place].map((ctrl) => ctrl.valid).some((ctrlValid) => ctrlValid === false);
    console.log(check);
    console.log(this.fg);
    return check;
  }

  get stepTwoValid() {
    const { description, title } = this.fg.controls;

    return [description, title].map((ctrl) => ctrl.valid).some((ctrlValid) => ctrlValid === false);
  }

  get stepThreeValid() {
    return true;
  }
  placeOptions: Observable<string[]>;
  constructor(public journalSvc: JournalCollectionService) {
    super();
  }

  ngOnInit(): void {
    this.fg.valueChanges.subscribe((obs) => console.log(this.fg.controls));
    this.placeOptions = this.journalSvc.getPlaces();
  }
}
