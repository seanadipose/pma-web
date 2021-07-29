import { Component, OnInit } from '@angular/core';
import { IFormGroup, RxFormBuilder } from '@rxweb/reactive-form-validators';

import { JournalCollectionService } from 'src/app/modules/collections/services/journal-collections.service';
import { PmaFormsService } from 'src/app/modules/forms/services/pma-forms.service';
import { JournalForm } from '../../models/journal-form.model';
import { forms as triggerForms } from '../../forms/trigger-form.model';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'pma-create-journal-page',

  template: `
    <nav mdcTabBar>
      <div mdcTabScroller>
        <div mdcTabScrollerArea>
          <div mdcTabScrollerContent>
            <a *ngFor="let tab of tabs; let i = index" mdcTab (activate)="activate(i)" tabindex="0">
              <span mdcTabContent>
                <span mdcTabLabel>{{ tab.name }}</span>
              </span>
              <span mdcTabIndicator>
                <span mdcTabIndicatorContent></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- <div fxLayout="column" fxLayoutAlign="start stretch" fxFlex fxFlexFill> -->
    <!-- <pma-create-journal-form [fg]="forms.triggerInfoForm" [position]="position"></pma-create-journal-form> -->
    <pma-trigger-info-form [fg]="forms.triggerInfoForm"></pma-trigger-info-form>

    <pma-feeling-form [fg]="forms.feelingForm"></pma-feeling-form>
    <pma-seeing-form [fg]="forms.seeingForm"></pma-seeing-form>
    <pma-hearing-form [fg]="forms.hearingForm"></pma-hearing-form>
    <pma-touching-form [fg]="forms.touchingForm"></pma-touching-form>
    <!-- </div> -->
  `,
  styleUrls: ['./create-journal-page.component.scss'],
})
export class CreateJournalPageComponent implements OnInit {
  selectedIndex = 0;
  tabs = [
    { name: 'Trigger', content: 'blah blah blah' },
    { name: 'Feelings', content: 'blah blah blah' },
  ];
  active = 0;

  activate(index: number) {
    this.active = index;
  }

  forms: ReturnType<triggerForms['getForms']>;
  position: { lat: number; lng: number };
  constructor(
    public formSvc: PmaFormsService,
    private jf: JournalForm,
    private fb: RxFormBuilder,
    public journalSvc: JournalCollectionService
  ) {
    // this.journalForm = this.formSvc.makeForm(this.jf);
    navigator.geolocation.getCurrentPosition(
      (position: any) => {
        if (position) {
          console.log('Latitude: ' + position.coords.latitude + 'Longitude: ' + position.coords.longitude);
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          this.position = { lat, lng };
        }
      },
      (error: any) => console.log(error)
    );
  }

  ngOnInit(): void {
    this.forms = new triggerForms(this.fb).getForms.bind(this)();

    this.forms.feelingForm.controls.body;

    const formtest = this.fb.group(new JournalForm());
    this.forms.triggerInfoForm.controls;
    console.log(
      '🚀 ------------------------------------------------------------------------------------------------------------------'
    );
    console.log(
      '🚀 ~ file: create-journal-page.component.ts ~ line 43 ~ CreateJournalPageComponent ~ ngOnInit ~ formtest',
      formtest
    );
    console.log(
      '🚀 ------------------------------------------------------------------------------------------------------------------'
    );
  }
}
