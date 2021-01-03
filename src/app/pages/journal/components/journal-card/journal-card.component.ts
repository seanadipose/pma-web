import { Component, Input, OnInit } from '@angular/core';
import { Journal, TimeStampType } from 'src/app/core/models/journal.model';

import { dateCollFns } from '../../../../modules/collections/functions/date.function';
import * as R from 'remeda';

// type CardType = ReturnType<typeof makeCard>;

interface Card {
  title: string;
  subTitle: string;
  body: string;
  footer: string;
}

class Card {}
const pickJournal = (jrnl: Journal) =>
  R.pick(jrnl, ['title', 'place', 'dateTime', 'time', 'emotionsList', 'description', 'id', 'rating']);

@Component({
  selector: 'pma-journal-card',
  template: `
    <mat-card>
      <mat-card-title-group>
        <mat-card-title
          ><h2 class="mat-headline primary-text">{{ title }}</h2></mat-card-title
        >
        <mat-card-subtitle
          ><h3 class="mat-title">{{ subTitle }}</h3></mat-card-subtitle
        >
      </mat-card-title-group>
      <div fxLayout="row" fxLayoutGap="7px" class="variant-text">
        <mat-icon *ngFor="let rating of ratings">{{ rating }}</mat-icon>
      </div>

      <mat-card-content>
        <p class="mat-body-1">{{ body }}</p></mat-card-content
      >
      <mat-card-actions></mat-card-actions>
      <mat-card-footer fxLayout="row" fxLayoutAlign="end start">
        <span class="mat-typography" class="accent-text"> {{ footer }}</span>
      </mat-card-footer>
    </mat-card>
  `,
  styleUrls: ['./journal-card.component.scss'],
})
export class JournalCardComponent extends Card implements OnInit {
  ratings: string[];
  // fields: JournalKeysType[] = ['title', 'place', 'dateTime', 'time', 'emotionsList'];

  makeCard(jrnl: ReturnType<typeof pickJournal>) {
    console.log('🚀 ---------------------------------------------------------------------------------------------');
    console.log('🚀 ~ file: journal-card.component.ts ~ line 41 ~ JournalCardComponent ~ makeCard ~ jrnl', jrnl);
    console.log('🚀 ---------------------------------------------------------------------------------------------');

    const { title = '', description = '', place = '', dateTime, time, id = '', rating } = jrnl;

    Object.assign(this, {
      title: title,
      subTitle: place,
      body: description,
      footer: `${dateCollFns.makeDateString(dateTime)} ${time}`,
      id: id,
    });

    this.ratings = R.pipe(
      R.range(1, rating),
      R.map((num) => 'error_outline')
    );
  }

  @Input('journal') set setJournal(jrnl: Journal) {
    console.log(jrnl);
    this.makeCard(jrnl);

    // this.time = time;
    // this.dateTime = new Date(dateTime.seconds);
  }

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
