import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFormGroup, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Journal } from 'src/app/core/models/journal.model';
import { StateService } from 'src/app/core/services/state-service';
import { JournalCollectionService } from 'src/app/modules/collections/services/journal-collections.service';
import { PmaFormsService } from 'src/app/modules/forms/services/pma-forms.service';
import { JournalForm } from '../../models/journal-form.model';

@Component({
  selector: 'pma-journal-page',
  template: `
    <pma-journal-form *ngIf="journalForm" [journal]="journal$ | async" [fg]="journalForm"></pma-journal-form>
  `,
  styleUrls: ['./journal-page.component.scss'],
  providers: [{ provide: JournalForm, useClass: JournalForm }],
})
export class JournalPageComponent implements OnInit {
  journalForm: IFormGroup<JournalForm>;
  journal$: any;

  constructor(
    private journalSvc: JournalCollectionService,
    // public formSvc: PmaFormsService,
    private jf: JournalForm,
    private activatedRoute: ActivatedRoute,
    private stateSvc: StateService,
    private fb: RxFormBuilder
  ) {
    this.journalForm = this.fb.formGroup(this.jf) as IFormGroup<JournalForm>;
  }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    // this.journal$ =

    this.stateSvc
      .userId$()
      .pipe(
        filter((res) => !!res),
        switchMap((userId) =>
          this.journalSvc
            .getOne(userId, id)
            .toPromise()
            .then((obs) => console.log(obs.metadata))
        )
      )
      .subscribe((obs) => console.log(obs));
  }
}
