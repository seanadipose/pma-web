import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFormGroup } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Journal } from 'src/app/core/models/journal.model';
import { JournalCollectionService } from 'src/app/modules/collections/services/journal-collections.service';
import { PmaFormsService } from 'src/app/modules/forms/services/pma-forms.service';
import { JournalForm } from '../../models/journal-form.model';

@Component({
  selector: 'pma-journal-page',
  template: ` <pma-journal-form [journal]="journal$ | async" [fg]="journalForm"></pma-journal-form> `,
  styleUrls: ['./journal-page.component.scss'],
  providers: [JournalForm],
})
export class JournalPageComponent implements OnInit {
  journalForm: IFormGroup<JournalForm> = this.formSvc.makeForm(this.jf);

  journal$: Observable<Journal>;

  constructor(
    private journalSvc: JournalCollectionService,
    public formSvc: PmaFormsService,
    private jf: JournalForm,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.journal$ = this.journalSvc.getOne('Q6XV6zAOwFCR1IdvX31n').pipe(map((res) => res.data()));
  }
}
