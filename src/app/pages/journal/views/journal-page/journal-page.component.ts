import { Component, OnInit } from '@angular/core';
import { IFormGroup } from '@rxweb/reactive-form-validators';
import { PmaFormsService } from 'src/app/modules/forms/services/pma-forms.service';
import { JournalForm } from '../../models/journal-form.model';

@Component({
  selector: 'pma-journal-page',
  template: ` <pma-journal-form [fg]="journalForm"></pma-journal-form> `,
  styleUrls: ['./journal-page.component.scss'],
  providers: [JournalForm],
})
export class JournalPageComponent implements OnInit {
  journalForm: IFormGroup<JournalForm>;
  constructor(public formSvc: PmaFormsService, private jf: JournalForm) {
    this.journalForm = this.formSvc.makeForm(this.jf);
  }

  ngOnInit(): void {}
}
