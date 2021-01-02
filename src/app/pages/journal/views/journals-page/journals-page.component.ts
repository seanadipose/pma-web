import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Journal } from 'src/app/core/models/journal.model';
import { StateService } from 'src/app/core/services/state-service';
import { JournalCollectionService } from 'src/app/modules/collections/services/journal-collections.service';

@Component({
  selector: 'pma-journals-page',
  template: `
    <div fxLayout="row wrap" fxLayoutAlign="start stretch" fxLayoutGap="15px">
      <ng-container *ngIf="journals$ | async as journals" fxLayout="col">
        <mat-card *ngFor="let jrnl of journals" fxFlex="40%" fxFlexFill>
          <mat-card-header>{{ jrnl.title }}</mat-card-header>
          <mat-card-subtitle> {{ jrnl.place }} {{ jrnl.time }} </mat-card-subtitle>
        </mat-card>
      </ng-container>
    </div>
  `,
  styleUrls: ['./journals-page.component.scss'],
})
export class JournalsPageComponent implements OnInit {
  journals$: Observable<Journal[]>;
  constructor(private stateSvc: StateService, private journalSvc: JournalCollectionService) {}

  ngOnInit(): void {
    this.journals$ = from(this.journalSvc.list(this.stateSvc.userId)).pipe(
      map((res) => res.docs.map((doc) => doc.data() as Journal))
    );
    this.journals$.subscribe((obs) => console.log(obs));
    // .then((res) => console.log(res.docs.map((doc) => doc.data())));
  }
}
