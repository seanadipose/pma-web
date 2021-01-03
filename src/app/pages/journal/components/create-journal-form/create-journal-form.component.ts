import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, EventEmitter, InjectionToken, Input, OnInit, Output } from '@angular/core';
import { MatChipsDefaultOptions } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Journal } from 'src/app/core/models/journal.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { StateService } from 'src/app/core/services/state-service';
import { JournalCollectionService } from 'src/app/modules/collections/services/journal-collections.service';
import { JournalForm } from '../../models/journal-form.model';
import { JournalFormComponent } from '../journal-form/journal-form.component';

@Component({
  selector: 'pma-create-journal-form',
  template: `
    <mat-horizontal-stepper
      #stepper
      (selectionChange)="onChange($event)"
      [selectedIndex]="selectedIndex"
      color="success"
    >
      <form [formGroup]="fg">
        <mat-step [hasError]="selectedIndex > 0 && emotionCloud.selectedOptions.length < 1" style="height: 100%;">
          <ng-template matStepLabel>How bad is it?</ng-template>
          <!-- <mat-form-field> -->
          <div
            fxLayout="column"
            fxLayoutAlign="space-around center"
            fxLayoutGap="30px"
            class="step-container"
            fxFlexFill
          >
            <mat-label>How's your mood?</mat-label>
            <pma-icon-picker-input #moodScale="iconInput" [(rating)]="rating"></pma-icon-picker-input>
            <pma-autocomplete-input
              name="emotions"
              label="Describe feelings"
              style="margin-top: 15px;"
              [options]="emotionOptions | async"
              #emotionCloud="autoInput"
              appearance="fill"
            ></pma-autocomplete-input>
            <mat-chip-list #chipList aria-label="Fruit selection">
              <mat-chip
                *ngFor="let option of emotionCloud.selectedOptions; index as i"
                [selectable]="false"
                [removable]="true"
                (removed)="emotionCloud.removeSelection(i)"
                defaultColor="accent"
                color="primary"
              >
                {{ option }}
                <mat-icon matChipRemove color="primary">cancel</mat-icon>
              </mat-chip>
            </mat-chip-list>
          </div>
          <!-- </mat-form-field> -->
          <pma-btn-cntr>
            <button
              mat-raised-button
              matStepperNext
              [disabled]="emotionCloud.selectedOptions.length < 1"
              color="accent"
            >
              Next
            </button>
          </pma-btn-cntr>
        </mat-step>
        <mat-step [hasError]="stepTwoInvalid" errorMessage="must fill out all fields">
          <ng-template matStepLabel>When and where</ng-template>
          <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="10px" class="step-container" fxFlexFill>
            <div fxLayout="row" fxLayoutAlign="start start" fxLayoutGap="15px" fxFlexFill>
              <pma-date-input name="dateTime" label="When it started" fxFlex="50"></pma-date-input>
              <pma-input type="time" name="time" label="Time of day" fxFlex="50"></pma-input>
            </div>
            <pma-location-input name="geoloc" label="location" fxFlexFill></pma-location-input>
            <pma-select-input name="place" label="Place" fxFlexFill [options]="placeOptions | async"></pma-select-input>
          </div>
          <pma-btn-cntr>
            <button mat-button matStepperPrevious>Back</button>

            <button mat-raised-button matStepperNext [disabled]="stepTwoInvalid" color="accent">Next</button>
          </pma-btn-cntr>
        </mat-step>
        <mat-step [hasError]="selectedIndex === 2 && fg.invalid">
          <ng-template matStepLabel>What happened</ng-template>
          <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="15ppx" class="step-container">
            <pma-input name="title" label="title" fxFlexFill></pma-input>

            <pma-textbox-input name="description" label="description" fxFlexFill></pma-textbox-input>
          </div>
          <pma-btn-cntr>
            <button mat-button matStepperPrevious>Back</button>
            <button
              mat-raised-button
              matStepperNext
              color="primary"
              (click)="submit(fg.getRawValue(), emotionCloud.selectedOptions, moodScale.rating)"
            >
              Submit
            </button>
          </pma-btn-cntr>
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
export class CreateJournalFormComponent implements OnInit {
  @Input() fg: any;
  selectedIndex = 0;
  rating: number = 0;
  emotionOptions: Observable<string[]>;
  placeOptions: Observable<string[]>;
  @Output() onSubmit = new EventEmitter<any>();

  getArray(num: number) {
    return new Array(Math.round(num));
  }

  get stepTwoInvalid() {
    if (this.selectedIndex === 0) return false;
    const { dateTime, time, place } = this.fg.controls;

    const check = [dateTime, time, place].map((ctrl) => ctrl.valid).some((ctrlValid) => ctrlValid === false);

    return check;
  }

  get stepThreeInvalid() {
    if (this.selectedIndex < 2) return false;
    const { description, title } = this.fg.controls;

    return [description, title].map((ctrl) => ctrl.valid).some((ctrlValid) => ctrlValid === false);
  }

  get stepThreeValid() {
    return this.fg.valid;
  }

  constructor(
    public journalSvc: JournalCollectionService,
    private stateSvc: StateService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingSvc: LoadingService
  ) {}

  ngOnInit(): void {
    this.fg.valueChanges.subscribe((obs) => console.log(this.fg.controls));
    this.placeOptions = this.journalSvc.getPlaces();
    this.emotionOptions = this.journalSvc.getEmtions();
  }

  onChange(evt: any) {
    const { selectedIndex = 0 } = evt;
    this.selectedIndex = selectedIndex;
  }

  async submit(data: JournalForm, emotions: string[], rating: number = 3) {
    const journal = new Journal({ ...data, rating, emotionsList: emotions }).value;
    console.log('run');
    try {
      // const res = await this.journalSvc.create(this.stateSvc.userId, journal);

      this.loadingSvc.responseSnackBar();
      // this.router.navigate([`journals/${res.id}`]);
    } catch (err) {
      this.loadingSvc.responseSnackBar(false);
      console.log(err);
    }
  }
}
