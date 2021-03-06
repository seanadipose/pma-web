import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Journal } from 'src/app/core/models/journal.model';
import { StateService } from 'src/app/core/services/state-service';
import { JournalCollectionService } from 'src/app/modules/collections/services/journal-collections.service';

@Component({
  selector: 'pma-journals-page',
  template: `
    <!-- <div fxLayout="row wrap" fxLayoutAlign="space-evenly stretch" fxLayoutGap="15px" class="card-container"> -->
    <ng-container *ngIf="journals$ | async as jrnls">
      <mat-grid-list cols="3" gutterSize="15px" rowHeight="560px">
        <mat-grid-tile [colspan]="1" [rowspan]="1" *ngFor="let jrnl of jrnls">
          <pma-journal-card [journal]="jrnl" class="dashboard-card"></pma-journal-card>
        </mat-grid-tile>
      </mat-grid-list>
    </ng-container>
    <!-- </div> -->
  `,
  styleUrls: ['./journals-page.component.scss'],
})
export class JournalsPageComponent implements OnInit {
  mapCols(num: number) {
    num % 3;
  }
  journals$: Observable<Journal[]>;
  constructor(private stateSvc: StateService, private journalSvc: JournalCollectionService) {}

  ngOnInit(): void {
    this.journals$ = this.stateSvc.userId$().pipe(
      switchMap((userId) => this.journalSvc.list(userId)),

      map((res) => res.docs.map((doc) => doc.data() as Journal))
      // map((jrnl) => ({ ...jrnl, cols: 1, rows: 1 }))
    );
    // .then((res) => console.log(res.docs.map((doc) => doc.data())));
  }
}
