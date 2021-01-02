import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from 'src/app/core/services/state-service';
import { JournalCollectionService } from 'src/app/modules/collections/services/journal-collections.service';

@Component({
  selector: 'pma-journals-page',
  template: `
    <mat-card *ngFor="let journal of journals$ | async as journal">
      <mat-card-header>{{ journal.title }}</mat-card-header>
    </mat-card>
  `,
  styleUrls: ['./journals-page.component.scss'],
})
export class JournalsPageComponent implements OnInit {
  journals$: any;
  constructor(private stateSvc: StateService, private journalSvc: JournalCollectionService) {}

  ngOnInit(): void {
    this.journals$ = from(this.journalSvc.list(this.stateSvc.userId)).pipe(
      map((res) => res.docs.map((doc) => doc.data()))
    );
    this.journals$.subscribe((obs) => console.log(obs));
    // .then((res) => console.log(res.docs.map((doc) => doc.data())));
  }
}
