import { Component, OnInit } from '@angular/core';
import { IFormGroup } from '@rxweb/reactive-form-validators';
import { PmaFormsService } from 'src/app/modules/forms/services/pma-forms.service';
import { JournalForm } from '../../models/journal-form.model';

@Component({
  selector: 'pma-create-journal-page',
  template: ` <pma-create-journal-form [fg]="journalForm"></pma-create-journal-form> `,
  styleUrls: ['./create-journal-page.component.scss'],
})
export class CreateJournalPageComponent implements OnInit {
  journalForm: IFormGroup<JournalForm>;
  constructor(public formSvc: PmaFormsService, private jf: JournalForm) {
    this.journalForm = this.formSvc.makeForm(this.jf);
  }

  ngOnInit(): void {}
}
