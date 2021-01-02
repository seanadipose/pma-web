import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, InjectionToken, OnInit } from '@angular/core';
import { MatChipsDefaultOptions } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { Journal } from 'src/app/core/models/journal.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { JournalCollectionService } from 'src/app/modules/collections/services/journal-collections.service';
import { JournalForm } from '../../models/journal-form.model';
import { JournalFormComponent } from '../journal-form/journal-form.component';

@Component({
  selector: 'pma-create-journal-form',
  template: `
    <mat-horizontal-stepper #stepper (selectionChange)="onChange($event)" [selectedIndex]="selectedIndex">
      <form [formGroup]="fg">
        <mat-step [hasError]="selectedIndex > 0 && emotionCloud.selectedOptions.length < 1">
          <ng-template matStepLabel>How you feel</ng-template>
          <!-- <mat-form-field> -->
          <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="30px" class="step-container">
            <mat-label>How's your mood?</mat-label>
            <mat-slider
              step="1"
              tickInterval="1"
              max="5"
              formControlName="rating"
              [thumbLabel]="true"
              defaultTabIndex="3"
              #slide="matSlider"
            ></mat-slider>
            <span style="margin-bottom: 20px;">{{ fg.get('rating').value }}</span>
            <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="15px">
              <ng-container *ngFor="let item of getArray(slide.value)">
                <mat-icon color="accent">star_rate</mat-icon>
              </ng-container>
            </div>
            <pma-autocomplete-input
              name="emotions"
              label="How are you feeling?"
              style="margin-top: 15px;"
              [options]="emotionOptions | async"
              #emotionCloud="autoInput"
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
          <div fxLayout="column" fxLayoutAlign="start" fxLayoutGap="10px" class="step-container">
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
              [disabled]="fg.invalid"
              (click)="submit(fg.getRawValue(), emotionCloud.selectedOptions)"
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
export class CreateJournalFormComponent extends JournalFormComponent implements OnInit {
  selectedIndex = 0;
  emotionOptions: Observable<string[]>;
  placeOptions: Observable<string[]>;
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

  constructor(public journalSvc: JournalCollectionService, private loadingSvc: LoadingService) {
    super();
  }

  ngOnInit(): void {
    this.fg.valueChanges.subscribe((obs) => console.log(this.fg.controls));
    this.placeOptions = this.journalSvc.getPlaces();
    this.emotionOptions = this.journalSvc.getEmtions();
  }

  onChange(evt: any) {
    const { selectedIndex = 0 } = evt;
    this.selectedIndex = selectedIndex;
  }

  async submit(data: JournalForm, emotions: string[]) {
    const journal = new Journal({ ...data, emotionsList: emotions }).value;
    try {
      const res = await this.journalSvc.create(journal);
      console.log(
        '🚀 -------------------------------------------------------------------------------------------------------'
      );
      console.log(
        '🚀 ~ file: create-journal-form.component.ts ~ line 163 ~ CreateJournalFormComponent ~ submit ~ res',
        res
      );
      console.log(
        '🚀 -------------------------------------------------------------------------------------------------------'
      );
      this.loadingSvc.responseSnackBar();
    } catch (err) {
      this.loadingSvc.responseSnackBar(false);
      console.log(err);
    }
  }
}
