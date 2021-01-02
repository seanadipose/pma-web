import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFormGroup } from '@rxweb/reactive-form-validators';
import { Journal } from 'src/app/core/models/journal.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { StateService } from 'src/app/core/services/state-service';
import { JournalCollectionService } from 'src/app/modules/collections/services/journal-collections.service';
import { PmaFormsService } from 'src/app/modules/forms/services/pma-forms.service';
import { JournalForm } from '../../models/journal-form.model';

@Component({
  selector: 'pma-create-journal-page',
  template: ` <pma-create-journal-form [fg]="journalForm"></pma-create-journal-form> `,
  styleUrls: ['./create-journal-page.component.scss'],
})
export class CreateJournalPageComponent implements OnInit {
  journalForm: IFormGroup<JournalForm>;
  constructor(
    public formSvc: PmaFormsService,
    private jf: JournalForm,

    public journalSvc: JournalCollectionService
  ) {
    this.journalForm = this.formSvc.makeForm(this.jf);
  }

  ngOnInit(): void {}
}
