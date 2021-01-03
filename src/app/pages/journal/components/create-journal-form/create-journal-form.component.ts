import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Journal } from 'src/app/core/models/journal.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { StateService } from 'src/app/core/services/state-service';
import { JournalCollectionService } from 'src/app/modules/collections/services/journal-collections.service';
import { JournalForm } from '../../models/journal-form.model';

@Component({
  selector: 'pma-create-journal-form',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center" fxFlex fxFlexFill>
      <div mdcCard>
        <mat-horizontal-stepper
          #stepper
          (selectionChange)="onChange($event)"
          [selectedIndex]="selectedIndex"
          color="success"
          style="height: 100%;"
        >
          <div class="step-container">
            <form [formGroup]="fg">
              <mat-step [hasError]="selectedIndex > 0 && emotionCloud.selectedOptions.length < 1" style="height: 100%">
                <ng-template matStepLabel>How bad is it?</ng-template>
                <!-- <mat-form-field> -->
                <div
                  fxLayout="column"
                  fxLayoutAlign="space-around center"
                  fxLayoutGap="30px"
                  class="step-container"
                  fxFlexFill
                >
                  <div fxLayout="row" fxLayoutAlign="space-between stretch" fxLayoutGap="5px" fxFlexFill>
                    <pma-date-input name="dateTime" label="When it started" fxFlex fxFlexFill></pma-date-input>
                    <pma-input type="time" name="time" label="Time of day" fxFlex fxFlexFill></pma-input>
                  </div>
                  <pma-input name="title" label="Trigger" style="width:100%"></pma-input>
                  <pma-autocomplete-input
                    name="emotions"
                    label="Describe feelings"
                    style="margin-top: 15px;"
                    [options]="emotionOptions | async"
                    #emotionCloud="autoInput"
                    appearance="outline"
                    style="width:100%"
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
                  <pma-icon-picker-input #moodScale="iconInput" [(rating)]="rating"></pma-icon-picker-input>
                  <button
                    mat-raised-button
                    matStepperNext
                    [disabled]="emotionCloud.selectedOptions.length < 1 && fg.get('title').valid"
                    color="accent"
                  >
                    Next
                  </button>
                </div>
              </mat-step>
              <mat-step [hasError]="stepTwoValid" errorMessage="must fill out all fields">
                <ng-template matStepLabel>When and where</ng-template>
                <div
                  fxLayout="column"
                  fxLayoutAlign="space-around stretch"
                  fxLayoutGap="30px"
                  class="step-container"
                  fxFlexFill
                >
                  <!-- <div fxLayout="row" fxLayoutAlign="start start" fxLayoutGap="15px" fxFlexFill> -->

                  <!-- </div> -->
                  <div fxLayout="row" fxLayoutAlign="space-between stretch" fxLayoutGap="5px" fxFlexFill>
                    <pma-select-input
                      name="place"
                      label="Place"
                      [options]="placeOptions | async"
                      fxFlex
                      fxFlexFill
                    ></pma-select-input>

                    <pma-location-input
                      name="geoloc"
                      label="location"
                      #loc="locationInput"
                      fxFlex
                      fxFlexFill
                    ></pma-location-input>
                  </div>
                  <agm-map
                    *ngIf="loc.lat && loc.lat"
                    [latitude]="loc.lat"
                    [longitude]="loc.lng"
                    [zoom]="16"
                    [disableDefaultUI]="true"
                  >
                    <agm-marker [latitude]="loc.lat" [longitude]="loc.lng"></agm-marker>
                  </agm-map>

                  <!-- <pma-btn-cntr> -->
                  <div fxLayout="row" fxLayoutAlign="center center">
                    <button mat-button matStepperPrevious>Back</button>

                    <button
                      mat-raised-button
                      matStepperNext
                      [disabled]="stepTwoValid"
                      mat-raised-button
                      color="primary"
                      (click)="submit(fg.getRawValue(), emotionCloud.selectedOptions, moodScale.rating)"
                    >
                      Next
                    </button>
                  </div>
                  <!-- </pma-btn-cntr> -->
                </div>
              </mat-step>
              <!-- <mat-step [hasError]="selectedIndex === 2 && fg.invalid">
                <ng-template matStepLabel>What happened</ng-template>

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
              </mat-step> -->
            </form>
          </div>
        </mat-horizontal-stepper>
      </div>
    </div>
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

  get stepTwoValid() {
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
