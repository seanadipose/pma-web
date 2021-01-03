import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Journal } from 'src/app/core/models/journal.model';
import { StateService } from 'src/app/core/services/state-service';
import { JournalCollectionService } from 'src/app/modules/collections/services/journal-collections.service';

@Component({
  selector: 'pma-journals-page',
  template: `
    <div fxLayout="row wrap" fxLayoutAlign="space-evenly stretch" fxLayoutGap="15px" class="card-container">
      <ng-container *ngIf="journals$ | async as journals">
        <pma-journal-card *ngFor="let jrnl of journals" [journal]="jrnl"></pma-journal-card>
      </ng-container>
    </div>
  `,
  styleUrls: ['./journals-page.component.scss'],
})
export class JournalsPageComponent implements OnInit {
  journals$: Observable<Journal[]>;
  constructor(private stateSvc: StateService, private journalSvc: JournalCollectionService) {}

  ngOnInit(): void {
    this.journals$ = this.stateSvc.userId$().pipe(
      switchMap((userId) => this.journalSvc.list(userId)),
      map((res) => res.docs.map((doc) => doc.data() as Journal))
    );
    // .then((res) => console.log(res.docs.map((doc) => doc.data())));
  }
}
